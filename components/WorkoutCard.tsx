import Link from "next/link";
import { TagPills } from "./TagPills";
import { StatsRow } from "./StatsRow";
import type { Workout } from "@/lib/types";

export function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-[#121212] transition hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_12px_40px_rgba(204,255,0,0.08)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>
      <div className="space-y-3 p-4">
        <TagPills tags={workout.muscleGroups} />
        <h3 className="font-display text-lg leading-tight tracking-wide text-white uppercase">
          {workout.name}
        </h3>
        <p className="text-sm text-zinc-400">{workout.equipment}</p>
        <StatsRow
          duration={workout.duration}
          calories={workout.caloriesBurned}
          rating={workout.rating}
        />
      </div>
    </Link>
  );
}
