"use client";
import { PropsWithChildren, useEffect, useState } from "react";
import Logo from "../../shared/Logo";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signout } from "@/actions/auth";
import { useAuthStore } from "@/store/authStore";

export default function HeaderBar({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading } = useAuthStore();
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    useAuthStore.getState().loadUser();

    setMounted(true);
  }, [pathname, forceUpdate]);

  if (!mounted) {
    return (
      <>
        <header className="fixed top-0 z-20 flex h-[60px] w-full items-center justify-between border-b border-gray-200 bg-white p-4 md:h-[64px] lg:h-[68px]">
          <Logo />
        </header>
        <div className="h-[60px] md:h-[64px] lg:h-[68px]"></div>
        {children}
      </>
    );
  }

  const isActive = (path: string) => pathname === path;
  const isLoggedIn = !!user;

  const handleLogout = async () => {
    try {
      const result = await signout();

      if (result && "success" in result) {
        useAuthStore.setState({ user: null });

        setForceUpdate((prev) => prev + 1);

        router.push("/");
      } else if (result && "error" in result) {
        console.error("로그아웃 오류:", result.error);
      }
    } catch (err) {
      console.error("로그아웃 오류:", err);
    }
  };

  return (
    <>
      <header className="fixed top-0 z-20 flex h-[60px] w-full items-center justify-between border-b border-gray-200 bg-white p-4 md:h-[64px] lg:h-[68px]">
        <Logo />
        {isLoggedIn ? (
          <>
            <div className="hidden grow gap-10 pl-10 text-lg font-bold text-neutral-500 xl:flex">
              <Link href="/record" className={cn(isActive("/record") && "text-neutral-800")}>
                기록
              </Link>
              <Link href="/recipe" className={cn(isActive("/recipe") && "text-neutral-800")}>
                레시피
              </Link>
              <Link href="/menu" className={cn(isActive("/menu") && "text-neutral-800")}>
                급식표
              </Link>
            </div>
            <Button onClick={handleLogout} variant="default" className="w-20" disabled={isLoading}>
              로그아웃
            </Button>
          </>
        ) : (
          <Button
            onClick={() => router.push("/login")}
            variant="default"
            className="w-20"
            disabled={isLoading}
          >
            로그인
          </Button>
        )}
      </header>
      <div className="h-[60px] md:h-[64px] lg:h-[68px]"></div>
      {children}
    </>
  );
}
