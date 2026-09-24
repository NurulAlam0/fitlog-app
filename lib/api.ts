import type { Workout } from "./types";

export const API_BASE = "https://api.abcz.workers.dev/api/fitlog";

export async function fetchWorkouts(init?: RequestInit): Promise<Workout[]> {
  const res = await fetch(API_BASE, init);
  if (!res.ok) {
    throw new Error("Failed to load workouts");
  }
  return res.json();
}

export async function fetchWorkout(id: string | number): Promise<Workout | null> {
  const res = await fetch(`${API_BASE}/${id}`, {
    next: { revalidate: 3600 },
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error("Failed to load workout");
  }
  return res.json();
}
