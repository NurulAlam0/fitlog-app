import { notFound } from "next/navigation";
import { WorkoutDetails } from "@/components/WorkoutDetails";
import { fetchWorkout, fetchWorkouts } from "@/lib/api";

export async function generateStaticParams() {
  try {
    const workouts = await fetchWorkouts();
    return workouts.map((workout) => ({ id: String(workout.id) }));
  } catch {
    return [];
  }
}

export const dynamicParams = true;
export const revalidate = 3600;

export default async function WorkoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workout = await fetchWorkout(id);
  if (!workout) notFound();
  return <WorkoutDetails workout={workout} />;
}
