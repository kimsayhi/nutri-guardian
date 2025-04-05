import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center gap-1">
      <span className="relative bottom-0.5 h-[27px] w-6 md:h-[30px] md:w-7 xl:h-[33px] xl:w-8">
        <Image src="/images/logo.png" alt="logo" fill sizes="100%" />
      </span>
      <span className="text-primary-700 font-aggro text-xl font-bold md:text-2xl xl:text-3xl">
        영양지킴이
      </span>
    </div>
  );
}
