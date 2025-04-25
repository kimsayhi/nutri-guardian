import { PropsWithChildren } from "react";
import Logo from "../../shared/Logo";
import { IoChatbubbleEllipses } from "react-icons/io5";

export default function HeaderBar({ children }: PropsWithChildren) {
  return (
    <>
      <header className="fixed top-0 z-20 flex h-[60px] w-full items-center justify-between border-b border-gray-200 bg-white p-4 md:h-[64px] lg:h-[68px]">
        <Logo />
        <button className="text-primary">
          <IoChatbubbleEllipses size={24} />
        </button>
      </header>
      <div className="h-[60px] md:h-[64px] lg:h-[68px]"></div>
      {children}
    </>
  );
}
