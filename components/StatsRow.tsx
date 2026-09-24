import { Clock, Flame, Star } from "lucide-react";

export function StatsRow({
  duration,
  calories,
  rating,
}: {
  duration: number;
  calories: number;
  rating: number;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400">
      <span className="inline-flex items-center gap-1.5">
        <Clock className="h-3.5 w-3.5 text-accent" />
        {duration} min
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Flame className="h-3.5 w-3.5 text-orange-400" />
        {calories} kcal
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Star className="h-3.5 w-3.5 text-yellow-400" />
        {rating}
      </span>
    </div>
  );
}
