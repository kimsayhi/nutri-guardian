"use client";
import { IoMdHome } from "react-icons/io";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { FaBook, FaPencilAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { usePathname } from "next/navigation";
// import Link from "next/link";
import { toast } from "@/utils/toast";

// 공개 접근 가능한 페이지 경로 목록
const PUBLIC_PATHS = ["/", "/login", "/signup", "/auth"];

// 푸터바에 표시될 메뉴 항목
const MENU_ITEMS = [
  { path: "/main", icon: IoMdHome, label: "메인" },
  { path: "/record", icon: FaPencilAlt, label: "기록" },
  { path: "/recipe", icon: FaBook, label: "레시피" },
  { path: "/menu", icon: MdOutlineRestaurantMenu, label: "급식표" },
];

export default function FooterBar() {
  const [mounted, setMounted] = useState(false);
  const { user, isLoading } = useAuthStore();
  const pathname = usePathname();

  // 현재 경로가 공개 페이지인지 확인
  const isPublicPage = PUBLIC_PATHS.some(
    (path) => pathname === path || pathname.startsWith(path + "/")
  );

  // 로그인 상태 확인
  const isLoggedIn = !!user;

  // 컴포넌트 마운트 시 로그인 상태 확인
  useEffect(() => {
    // 비공개 페이지인 경우에만 로그인 상태 확인
    if (!isPublicPage) {
      useAuthStore.getState().loadUser();
    }
    setMounted(true);
  }, [isPublicPage]);

  // 현재 경로가 활성화된 메뉴인지 확인하는 함수
  const isActive = (path: string) => pathname === path || pathname.startsWith(path + "/");

  // 마운트되지 않았거나, 공개 페이지인 경우 렌더링하지 않음
  // 로그인 확인 중이거나 로그인되지 않은 경우에도 렌더링하지 않음
  if (!mounted || isPublicPage || isLoading || !isLoggedIn) {
    return null;
  }

  return (
    <>
      <nav className="fixed right-0 bottom-0 left-0 z-10 flex justify-around border-t bg-white py-2 xl:hidden">
        {MENU_ITEMS.map((item) => (
          <button
            key={item.path}
            onClick={() => {
              toast.info("구현 중인 기능입니다.");
            }}
            className={`flex flex-col items-center ${
              isActive(item.path) ? "text-neutral-900" : "text-neutral-500"
            }`}
          >
            <item.icon size={24} />
            <span className="mt-1 text-xs">{item.label}</span>
          </button>
          // <Link
          //   key={item.path}
          //   href={item.path}
          //   className={`flex flex-col items-center ${
          //     isActive(item.path) ? "text-primary-900" : "text-gray-500"
          //   }`}
          // >
          //   <item.icon size={24} />
          //   <span className="mt-1 text-xs">{item.label}</span>
          // </Link>
        ))}
      </nav>
      <div className="h-[56px] xl:hidden"></div>
    </>
  );
}
