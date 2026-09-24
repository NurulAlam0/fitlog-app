"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Check, ChevronDown, X } from "lucide-react";
import { Loader } from "@/components/Loader";
import { StatsRow } from "@/components/StatsRow";
import { fetchWorkouts } from "@/lib/api";
import { usePlan } from "@/context/PlanContext";
import type { Workout } from "@/lib/types";

type Tab = "plan" | "saved";
type SortBy = "duration" | "calories" | "rating";

export function MyPlanPage() {
  const {
    plan,
    saved,
    removeFromPlan,
    removeFromSaved,
    markDone,
  } = usePlan();
  const [tab, setTab] = useState<Tab>("plan");
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortBy>("duration");

  useEffect(() => {
    let live = true;
    fetchWorkouts()
      .then((data) => {
        if (live) setWorkouts(data);
      })
      .finally(() => {
        if (live) setLoading(false);
      });
    return () => {
      live = false;
    };
  }, []);

  const byId = useMemo(() => {
    const map = new Map<number, Workout>();
    workouts.forEach((w) => map.set(w.id, w));
    return map;
  }, [workouts]);

  const plannedWorkouts = plan
    .map((item) => {
      const workout = byId.get(item.id);
      return workout ? { workout, done: item.done } : null;
    })
    .filter(Boolean) as { workout: Workout; done: boolean }[];

  const savedWorkouts = saved
    .map((item) => byId.get(item.id))
    .filter(Boolean) as Workout[];

  const metrics = plannedWorkouts.reduce(
    (acc, { workout }) => {
      acc.minutes += workout.duration;
      acc.calories += workout.caloriesBurned;
      return acc;
    },
    { minutes: 0, calories: 0 },
  );

  const list = (tab === "plan"
    ? plannedWorkouts
    : savedWorkouts.map((workout) => ({ workout, done: false })))
    .slice()
    .sort((left, right) => {
      const getValue = (workout: Workout) => {
        if (sortBy === "calories") return workout.caloriesBurned;
        return workout[sortBy];
      };
      return getValue(left.workout) - getValue(right.workout);
    });

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <h1 className="font-display text-5xl tracking-wide text-white uppercase">
        My Plan
      </h1>
      <p className="mt-2 text-zinc-400">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          ["Exercises", plan.length],
          ["Minutes", metrics.minutes],
          ["Calories", metrics.calories],
        ].map(([label, value]) => (
          <div
            key={String(label)}
            className="rounded-2xl border border-white/10 bg-[#121212] px-5 py-6"
          >
            <p className="font-display text-xs tracking-[0.22em] text-zinc-500 uppercase">
              {label}
            </p>
            <p className="mt-2 font-display text-4xl text-accent">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          {(
            [
              ["plan", "Today's Plan"],
              ["saved", "Saved"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`rounded-full px-4 py-2 font-display text-sm tracking-[0.16em] uppercase ${
                tab === id
                  ? "bg-accent text-ink"
                  : "border border-white/20 text-zinc-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <label className="flex w-full flex-col gap-1.5 text-sm text-zinc-300 sm:w-72">
          <span className="font-display tracking-[0.16em] uppercase">Sort By</span>
          <span className="relative">
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortBy)}
              className="w-full appearance-none rounded-xl border border-white/70 bg-transparent px-3 py-2.5 pr-10 text-sm text-white outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          </span>
        </label>
      </div>

      {loading && <Loader />}

      {!loading && list.length === 0 && (
        <div className="mt-16 text-center">
          <h2 className="font-display text-3xl tracking-wide text-white uppercase">
            Nothing here yet
          </h2>
          <p className="mt-3 text-zinc-400">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-md bg-accent px-6 py-3 font-display text-sm tracking-[0.16em] text-ink uppercase"
          >
            Go to workouts
          </Link>
        </div>
      )}

      {!loading && (
        <div className="mt-8 space-y-4">
          {list.map(({ workout, done }) => (
            <article
              key={workout.id}
              className={`flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#121212] p-4 sm:flex-row sm:items-center ${
                done ? "opacity-60" : ""
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={workout.image}
                alt={workout.name}
                className="h-28 w-full rounded-xl object-cover sm:h-24 sm:w-32"
              />
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-xl tracking-wide text-white uppercase">
                  {workout.name}
                </h3>
                <p className="mt-1 text-sm text-zinc-400">{workout.equipment}</p>
                <div className="mt-2">
                  <StatsRow
                    duration={workout.duration}
                    calories={workout.caloriesBurned}
                    rating={workout.rating}
                  />
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/workout/${workout.id}`}
                  className="rounded-md border border-white/20 px-3 py-2 text-sm text-white"
                >
                  View Details
                </Link>
                {tab === "plan" && (
                  <button
                    type="button"
                    onClick={() => {
                      markDone(workout.id);
                      toast.success("Marked as done");
                    }}
                    className="inline-flex items-center gap-1 rounded-md bg-accent px-3 py-2 text-sm text-ink"
                  >
                    <Check className="h-4 w-4" />
                    Mark as Done
                  </button>
                )}
                <button
                  type="button"
                  aria-label="Remove workout"
                  onClick={() => {
                    if (tab === "plan") {
                      removeFromPlan(workout.id);
                      toast.success("Removed from today's plan");
                    } else {
                      removeFromSaved(workout.id);
                      toast.success("Removed from saved");
                    }
                  }}
                  className="grid h-10 w-10 place-items-center rounded-md border border-white/20 text-zinc-300 hover:border-red-400 hover:text-red-400"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
