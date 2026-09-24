import type { Workout } from "./types";

export function matchesQuery(workout: Workout, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    workout.name.toLowerCase().includes(q) ||
    workout.equipment.toLowerCase().includes(q) ||
    workout.muscleGroups.some((tag) => tag.toLowerCase().includes(q))
  );
}
