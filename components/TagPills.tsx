export function TagPills({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 font-display text-[10px] tracking-[0.18em] text-accent uppercase"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
