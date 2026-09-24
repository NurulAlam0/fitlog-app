"use client";

import { useEffect, useState } from "react";
import { Hero } from "@/components/Hero";
import { Library } from "@/components/Library";
import { fetchWorkouts } from "@/lib/api";
import type { Workout } from "@/lib/types";

export function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let live = true;
    fetchWorkouts({ cache: "no-store" })
      .then((data) => {
        if (live) setWorkouts(data);
      })
      .catch(() => {
        if (live) setError("Could not load the library. Try again shortly.");
      })
      .finally(() => {
        if (live) setLoading(false);
      });
    return () => {
      live = false;
    };
  }, []);

  return (
    <>
      <Hero />
      <Library workouts={workouts} loading={loading} error={error} />
    </>
  );
}
