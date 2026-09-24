"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { PlanItem } from "@/lib/types";

const PLAN_KEY = "fitlog-plan";
const SAVED_KEY = "fitlog-saved";
export const PLAN_CAP = 5;

function readIds(key: string): PlanItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Array<number | PlanItem>;
    return parsed.map((item) =>
      typeof item === "number" ? { id: item, done: false } : item,
    );
  } catch {
    return [];
  }
}

function writeIds(key: string, items: PlanItem[]) {
  localStorage.setItem(key, JSON.stringify(items));
}

type PlanContextValue = {
  plan: PlanItem[];
  saved: PlanItem[];
  hydrated: boolean;
  addToPlan: (id: number) => { ok: boolean; reason?: string };
  saveForLater: (id: number) => { ok: boolean; reason?: string };
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markDone: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  planFull: boolean;
};

const PlanContext = createContext<PlanContextValue | null>(null);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [saved, setSaved] = useState<PlanItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setPlan(readIds(PLAN_KEY));
    setSaved(readIds(SAVED_KEY));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) writeIds(PLAN_KEY, plan);
  }, [plan, hydrated]);

  useEffect(() => {
    if (hydrated) writeIds(SAVED_KEY, saved);
  }, [saved, hydrated]);

  const addToPlan = useCallback(
    (id: number) => {
      if (plan.some((item) => item.id === id)) {
        return { ok: false, reason: "already" };
      }
      if (plan.length >= PLAN_CAP) {
        return { ok: false, reason: "full" };
      }
      setPlan((prev) =>
        prev.some((item) => item.id === id)
          ? prev
          : [...prev, { id, done: false }],
      );
      return { ok: true };
    },
    [plan],
  );

  const saveForLater = useCallback(
    (id: number) => {
      if (saved.some((item) => item.id === id)) {
        return { ok: false, reason: "already" };
      }
      setSaved((prev) =>
        prev.some((item) => item.id === id)
          ? prev
          : [...prev, { id, done: false }],
      );
      return { ok: true };
    },
    [saved],
  );

  const removeFromPlan = useCallback((id: number) => {
    setPlan((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const removeFromSaved = useCallback((id: number) => {
    setSaved((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const markDone = useCallback((id: number) => {
    setPlan((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: true } : item)),
    );
  }, []);

  const value = useMemo<PlanContextValue>(
    () => ({
      plan,
      saved,
      hydrated,
      addToPlan,
      saveForLater,
      removeFromPlan,
      removeFromSaved,
      markDone,
      isInPlan: (id) => plan.some((item) => item.id === id),
      isSaved: (id) => saved.some((item) => item.id === id),
      planFull: plan.length >= PLAN_CAP,
    }),
    [
      plan,
      saved,
      hydrated,
      addToPlan,
      saveForLater,
      removeFromPlan,
      removeFromSaved,
      markDone,
    ],
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within PlanProvider");
  return ctx;
}
