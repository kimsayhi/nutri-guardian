import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  color?: "primary" | "white";
}

export default function Logo({ color = "primary" }: LogoProps) {
  return (
    <Link href="/main" className="flex items-center gap-1">
      <span className="full relative bottom-0.5 h-[64] w-8 md:w-9 xl:w-10">
        <Image
          src={color === "primary" ? "/images/logo.png" : "/images/logo-white.png"}
          alt="logo"
          fill
          className="object-contain"
          sizes="100%"
        />
      </span>
      <span
        className={cn(
          "font-aggro text-xl font-bold md:text-2xl xl:text-3xl",
          color === "primary" ? "text-primary" : "text-white"
        )}
      >
        영양지킴이
      </span>
    </Link>
  );
}
