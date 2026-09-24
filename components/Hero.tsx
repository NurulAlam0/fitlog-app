import Link from "next/link";
import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
import bannerImage from "@/assets/banner.png";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:px-6 md:py-20">
        <div>
          <p className="font-display text-xs tracking-[0.42em] text-accent">
            WORKOUT LIBRARY
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[0.95] font-bold tracking-tight text-white uppercase sm:text-5xl lg:text-6xl">
            Train with intent.
            <br />
            Log every set.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-zinc-400">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <Link
            href="#library"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-display text-sm tracking-[0.18em] text-ink uppercase transition hover:brightness-110"
          >
            Browse Workouts
            <ArrowDownRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 rounded-3xl bg-accent/10 blur-3xl" />
          <div className="relative flex justify-center">
            <Image
              src={bannerImage}
              alt="Athlete training with intent"
              className="h-[280px] w-auto object-contain sm:h-[380px] md:h-[440px]"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
