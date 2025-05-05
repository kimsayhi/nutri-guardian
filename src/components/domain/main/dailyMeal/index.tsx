"use client";

import useDailyMeal from "@/hooks/query/useDailyMeal";
import { useState } from "react";
import { cn } from "@/utils/cn";
import { mockDailyMealData } from "@/lib/mock/mock";
import ContentsWrapper from "@/components/shared/ContentsWrapper";
import useDefaultProfileQuery from "@/hooks/query/useDefaultProfileQuery";

type MealType = "lunch" | "dinner";

export default function DailyMeal() {
  const { data: dailyMealData } = useDailyMeal();
  const dailyMeal = dailyMealData || mockDailyMealData;
  const [selectedMeal, setSelectedMeal] = useState<MealType>("lunch");
  const currentMeal = dailyMeal?.[selectedMeal];
  const handleTabChange = (meal: MealType) => {
    setSelectedMeal(meal);
  };
  const { data: defaultProfile } = useDefaultProfileQuery();
  const hasProfile = !!defaultProfile;

  return (
    <ContentsWrapper title="오늘의 식단" isBlur={!hasProfile}>
      <div className="flex w-full flex-col rounded-xl bg-white p-4 shadow-md">
        <div className="flex justify-between pb-2">
          <h3 className="flex items-end font-medium text-neutral-700">메뉴</h3>
          <div className="flex rounded-lg bg-gray-100">
            <button
              className={cn(
                "rounded-l-lg px-4 py-1.5 text-sm font-medium transition-colors",
                selectedMeal === "lunch"
                  ? "bg-primary-400 text-white"
                  : "text-neutral-600 hover:bg-gray-200"
              )}
              onClick={() => handleTabChange("lunch")}
            >
              중식
            </button>
            <button
              className={cn(
                "rounded-r-lg px-4 py-1.5 text-sm font-medium transition-colors",
                selectedMeal === "dinner"
                  ? "bg-primary-400 text-white"
                  : "text-neutral-600 hover:bg-gray-200"
              )}
              onClick={() => handleTabChange("dinner")}
            >
              석식
            </button>
          </div>
        </div>

        {currentMeal ? (
          <div className="flex flex-col gap-3">
            <div>
              <ul className="flex flex-col gap-1.5">
                {currentMeal.menu.map((item, index) => (
                  <li key={index} className="flex items-center rounded-md bg-gray-50 px-3 py-2">
                    <span className="bg-primary-100 text-primary-700 mr-2 flex h-5 w-5 items-center justify-center rounded-full text-xs">
                      {index + 1}
                    </span>
                    <span className="text-neutral-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-2">
              <h3 className="mb-2 font-medium text-neutral-700">영양 정보</h3>
              <div className="flex justify-between rounded-lg bg-gray-50 p-3">
                <span className="font-medium text-neutral-700">칼로리</span>
                <span className="text-primary-500 font-semibold">{currentMeal.calories} kcal</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-md bg-blue-50 p-2 text-center">
                  <div className="text-xs text-neutral-500">탄수화물</div>
                  <div className="font-medium text-blue-700">{currentMeal.nutrition.carbs}g</div>
                </div>
                <div className="rounded-md bg-pink-50 p-2 text-center">
                  <div className="text-xs text-neutral-500">단백질</div>
                  <div className="font-medium text-pink-700">{currentMeal.nutrition.protein}g</div>
                </div>
                <div className="rounded-md bg-amber-50 p-2 text-center">
                  <div className="text-xs text-neutral-500">지방</div>
                  <div className="font-medium text-amber-700">{currentMeal.nutrition.fat}g</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-[200px] items-center justify-center text-neutral-500">
            {selectedMeal === "lunch" ? "중식" : "석식"} 정보가 없습니다.
          </div>
        )}
      </div>
    </ContentsWrapper>
  );
}
