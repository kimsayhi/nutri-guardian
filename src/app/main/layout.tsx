import GNB from "@/components/layout/GNB";
import { PropsWithChildren } from "react";

export default function MainLayout({ children }: PropsWithChildren) {
  return <GNB>{children}</GNB>;
}
