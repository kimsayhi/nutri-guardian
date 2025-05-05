import { PropsWithChildren } from "react";
import HeaderBar from "./HeaderBar";
import FooterBar from "./FooterBar";

export default function GNB({ children }: PropsWithChildren) {
  return (
    <>
      <HeaderBar />
      {children}
      <FooterBar />
    </>
  );
}
