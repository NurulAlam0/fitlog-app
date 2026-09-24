import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[#070707]">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 py-8 sm:flex-row sm:items-center md:px-6">
        <Logo />
        <p className="text-sm text-zinc-500">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
