import { useState } from "react";
import useDailyMeal from "@/hooks/query/useDailyMeal";
import { cn } from "@/utils/cn";
import dayjs from "dayjs";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

export default function DailyMeal() {
  const { data: dailyMeal, isLoading, error } = useDailyMeal();
  const [isOpenTab, setIsOpenTab] = useState(false);
  const [activeTab, setActiveTab] = useState<"lunch" | "dinner">("lunch");

  const formattedDate = dailyMeal?.date
    ? dayjs(dailyMeal.date).format("YYYY년 MM월 DD일")
    : dayjs().format("YYYY년 MM월 DD일");

  const handleActiveTab = (tab: "lunch" | "dinner") => {
    setActiveTab(tab);
  };

  const handleMenuTab = (openMenu: boolean) => {
    setIsOpenTab(openMenu);
  };

  // 현재 선택된 메뉴 데이터
  const currentMealData = activeTab ? dailyMeal?.[activeTab] : null;

  return (
    <div className="flex w-full flex-col rounded-xl bg-white p-3">
      {/* 날짜 표시 */}
      <div className="mb-2 text-center text-xs text-neutral-600">{formattedDate}</div>
      {/* 메뉴 탭 버튼 */}
      <div className="mb-2 flex w-full justify-center">
        <button
          className={cn(
            "flex w-1/2 items-center justify-center border-b-2 py-[3px]",
            activeTab === "lunch"
              ? "border-primary-900 text-primary-900"
              : "border-neutral-500 text-neutral-500"
          )}
          onClick={() => handleActiveTab("lunch")}
        >
          중식
        </button>
        <button
          className={cn(
            "flex w-1/2 items-center justify-center border-b-2 py-[3px]",
            activeTab === "dinner"
              ? "border-primary-900 text-primary-900"
              : "border-neutral-500 text-neutral-500"
          )}
          onClick={() => handleActiveTab("dinner")}
        >
          석식
        </button>
      </div>
      {/* 아코디언 내용 영역 */}
      <div className="mt-1 overflow-hidden rounded-md">
        <div className="px-4 py-2">
          {isLoading ? (
            <div className="py-2 text-center text-sm text-neutral-500">
              급식 정보를 불러오는 중...
            </div>
          ) : error ? (
            <div className="py-2 text-center text-sm text-red-500">
              급식 정보를 불러오지 못했습니다.
            </div>
          ) : !currentMealData ? (
            <div className="py-2 text-center text-sm text-neutral-500">
              {activeTab === "lunch" ? "오늘 중식" : "오늘 석식"} 정보가 없습니다.
            </div>
          ) : (
            <>
              <ul className="flex max-h-[100px] flex-col flex-wrap py-1 text-sm">
                {currentMealData.menu.map((item) => (
                  <li key={item} className="w-1/2 py-0.5">
                    {item}
                  </li>
                ))}
              </ul>
              {isOpenTab ? (
                <button
                  className="flex w-full items-center justify-center rounded-md bg-gray-100 py-1 text-sm"
                  onClick={() => handleMenuTab(true)}
                >
                  <span>펼치기</span>
                  <IoChevronDown className="text-gray-500" />
                </button>
              ) : (
                <button
                  className="flex w-full items-center justify-center rounded-md bg-gray-100 py-1 text-sm"
                  onClick={() => handleMenuTab(false)}
                >
                  <span>접기</span>
                  <IoChevronUp className="text-gray-500" />
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
