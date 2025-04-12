import { PropsWithChildren } from "react";
import Logo from "../../shared/Logo";
import { IoChatbubbleEllipses } from "react-icons/io5";

export default function HeaderBar({ children }: PropsWithChildren) {
  return (
    <>
      <header className="bg-primary fixed top-0 z-20 flex h-[60px] w-full items-center justify-between p-4 md:h-[64px] lg:h-[68px]">
        <Logo />
        <button className="text-white">
          <IoChatbubbleEllipses className="text-white" size={24} />
        </button>
      </header>
      <div className="h-[60px] md:h-[64px] lg:h-[68px]"></div>
      {children}
    </>
  );
}
