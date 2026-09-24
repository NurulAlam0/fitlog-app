"use client";

import { toast } from "react-toastify";
import { Bookmark, CalendarPlus } from "lucide-react";
import { TagPills } from "./TagPills";
import { PLAN_CAP, usePlan } from "@/context/PlanContext";
import type { Workout } from "@/lib/types";

export function WorkoutDetails({ workout }: { workout: Workout }) {
  const { addToPlan, saveForLater, isInPlan, planFull } = usePlan();
  const alreadyPlanned = isInPlan(workout.id);
  const disablePlan = alreadyPlanned || planFull;

  const specs = [
    ["EQUIPMENT", workout.equipment],
    ["DIFFICULTY", workout.difficulty],
    ["SETS", String(workout.sets)],
    ["REPS", workout.reps],
    ["DURATION", `${workout.duration} min`],
    ["CALORIES", `${workout.caloriesBurned} kcal`],
    ["RATING", String(workout.rating)],
  ];

  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:grid-cols-2 md:px-6 md:py-16">
      <div className="overflow-hidden rounded-3xl border border-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={workout.image}
          alt={workout.name}
          className="h-full min-h-[320px] w-full object-cover md:min-h-[560px]"
        />
      </div>
      <div>
        <h1 className="font-display text-4xl tracking-wide text-white uppercase md:text-5xl">
          {workout.name}
        </h1>
        <p className="mt-4 text-zinc-400">{workout.description}</p>
        <div className="mt-5">
          <TagPills tags={workout.muscleGroups} />
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
          {specs.map(([label, value], i) => (
            <div
              key={label}
              className={`grid grid-cols-2 px-4 py-3 text-sm ${
                i % 2 === 0 ? "bg-white/5" : "bg-transparent"
              }`}
            >
              <span className="font-display tracking-[0.16em] text-zinc-500">
                {label}
              </span>
              <span className="text-white">{value}</span>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h2 className="font-display text-xl tracking-[0.2em] text-white uppercase">
            Instructions
          </h2>
          <ol className="mt-4 space-y-3">
            {workout.instructions.map((step, index) => (
              <li key={step} className="flex gap-3 text-zinc-300">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent font-display text-sm text-ink">
                  {index + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            disabled={disablePlan}
            onClick={() => {
              const result = addToPlan(workout.id);
              if (result.ok) toast.success("Added to today's plan");
              else if (result.reason === "already")
                toast.info("Already in today's plan");
              else if (result.reason === "full")
                toast.error(`Cap of ${PLAN_CAP} lifts for today.`);
            }}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 font-display text-sm tracking-[0.16em] text-ink uppercase disabled:cursor-not-allowed disabled:opacity-50"
          >
            <CalendarPlus className="h-4 w-4" />
            {alreadyPlanned
              ? "Already in plan"
              : planFull
                ? "Plan is full"
                : "Add to today's plan"}
          </button>
          <button
            type="button"
            onClick={() => {
              const result = saveForLater(workout.id);
              if (result.ok) toast.success("Saved for later");
              else toast.info("Already saved");
            }}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-white/30 px-5 py-3 font-display text-sm tracking-[0.16em] text-white uppercase"
          >
            <Bookmark className="h-4 w-4" />
            Save for later
          </button>
        </div>
      </div>
    </section>
  );
}
