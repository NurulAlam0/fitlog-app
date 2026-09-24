export function Loader({ label = "Loading workouts…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <div className="flex items-end gap-1.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="w-2 rounded-sm bg-accent bar-pulse"
            style={{ animationDelay: `${i * 0.12}s`, height: `${12 + i * 6}px` }}
          />
        ))}
      </div>
      <p className="font-display tracking-[0.25em] text-zinc-400 uppercase">
        {label}
      </p>
    </div>
  );
}
