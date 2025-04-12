import { ReactNode } from "react";
import AuthProvider from "./AuthProvider";
import QueryProvider from "./QueryProvider";

interface ProviderProps {
  children: ReactNode;
}

export default function Provider({ children }: ProviderProps) {
  return (
    <AuthProvider>
      <QueryProvider>{children}</QueryProvider>
    </AuthProvider>
  );
}
