import { PropsWithChildren } from "react";
import Logo from "../../shared/Logo";

export default function HeaderBar({ children }: PropsWithChildren) {
  return (
    <>
      <header className="fixed top-0 z-20 flex h-[60px] w-full items-center bg-white p-4 md:h-[64px] lg:h-[68px]">
        <Logo />
      </header>
      <div className="h-[60px] md:h-[64px] lg:h-[68px]"></div>
      {children}
    </>
  );
}
