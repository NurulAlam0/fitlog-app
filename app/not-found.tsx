import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center">
      <p className="font-display text-sm tracking-[0.4em] text-accent">404</p>
      <h1 className="mt-4 font-display text-5xl text-white uppercase">
        Lift not found
      </h1>
      <p className="mt-4 max-w-md text-zinc-400">
        That route is not in the library. Head back to the workouts and pick a
        lift that exists.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-md bg-accent px-6 py-3 font-display tracking-[0.16em] text-ink uppercase"
      >
        Go to workouts
      </Link>
    </section>
  );
}
