"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { WorkoutCard } from "./WorkoutCard";
import { Loader } from "./Loader";
import { matchesQuery } from "@/lib/utils";
import type { Workout } from "@/lib/types";

export function Library({
  workouts,
  loading,
  error,
}: {
  workouts: Workout[];
  loading: boolean;
  error: string | null;
}) {
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    return workouts.filter((w) => matchesQuery(w, query));
  }, [workouts, query]);

  return (
    <section id="library" className="scroll-mt-24 px-4 py-14 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-display text-4xl tracking-wide text-white uppercase">
              The Library
            </h2>
            <p className="mt-2 text-zinc-400">
              Twelve lifts covering every major muscle group.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="relative min-w-[220px] flex-1">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name or tag"
                className="w-full rounded-md border border-white/15 bg-black/40 py-2.5 pr-3 pl-10 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-accent"
              />
            </label>
          </div>
        </div>

        {loading && <Loader />}
        {error && (
          <p className="mt-10 text-center text-red-400">{error}</p>
        )}
        {!loading && !error && (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
        {!loading && !error && visible.length === 0 && (
          <p className="mt-10 text-center text-zinc-500">No lifts match that search.</p>
        )}
      </div>
    </section>
  );
}
