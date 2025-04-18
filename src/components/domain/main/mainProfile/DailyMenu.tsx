import { useState } from "react";
import useDailyMeal from "@/hooks/query/useDailyMeal";
import { cn } from "@/utils/cn";
import dayjs from "dayjs";

export default function DailyMenu() {
  const { data: dailyMeal, isLoading, error } = useDailyMeal();
  const [activeTab, setActiveTab] = useState<"lunch" | "dinner">("lunch");
  const currentMeal = dailyMeal?.[activeTab];

  // 날짜 형식 변환 (YYYY-MM-DD -> YYYY년 MM월 DD일)
  const formattedDate = dailyMeal?.date
    ? dayjs(dailyMeal.date).format("YYYY년 MM월 DD일")
    : dayjs().format("YYYY년 MM월 DD일");

  return (
    <div className="flex h-[230px] w-1/2 flex-col rounded-xl bg-white p-3">
      <div className="flex w-full justify-center text-lg font-semibold">
        <button
          className={cn(
            "flex w-1/2 items-center justify-center border-b-2 py-[3px]",
            activeTab === "lunch"
              ? "border-primary-900 text-primary-900"
              : "border-neutral-500 text-neutral-500"
          )}
          onClick={() => setActiveTab("lunch")}
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
          onClick={() => setActiveTab("dinner")}
        >
          석식
        </button>
      </div>

      <div className="mt-1 text-center text-xs text-neutral-600">{formattedDate}</div>

      {isLoading ? (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-neutral-500">급식 정보를 불러오는 중...</p>
        </div>
      ) : error ? (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-red-500">급식 정보를 불러오지 못했습니다.</p>
        </div>
      ) : !currentMeal ? (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-neutral-500">
            {activeTab === "lunch" ? "오늘 중식" : "오늘 석식"} 정보가 없습니다.
          </p>
        </div>
      ) : (
        <>
          <ul className="flex flex-1 flex-col overflow-y-auto px-3 py-2 text-sm font-semibold">
            {currentMeal.menu.map((item) => (
              <li key={item} className="py-0.5">
                {item}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
