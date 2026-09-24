import Link from "next/link";
import Image from "next/image";
import logoImage from "@/assets/logo.png";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center">
        <Image src={logoImage} alt="FitLog" className="h-8 w-8 object-contain" priority />
      </span>
      {!compact && (
        <span className="font-display text-xl tracking-[0.18em] text-white">
          FITLOG
        </span>
      )}
    </Link>
  );
}
