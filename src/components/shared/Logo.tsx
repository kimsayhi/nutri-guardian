import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/main" className="flex items-center gap-1">
      <span className="full relative bottom-0.5 h-[64] w-8 md:w-9 xl:w-10">
        <Image
          src="/images/logo-white.png"
          alt="logo"
          fill
          className="object-contain"
          sizes="100%"
        />
      </span>
      <span className="font-aggro text-xl font-bold text-white md:text-2xl xl:text-3xl">
        영양지킴이
      </span>
    </Link>
  );
}
