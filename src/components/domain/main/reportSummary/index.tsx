"use client";
import ContentsWrapper from "@/components/shared/ContentsWrapper";
import useDailyMeal from "@/hooks/query/useDailyMeal";
import { Button } from "@/components/ui/button";
import { mockDailyMealData } from "@/lib/mock/mock";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";
import {
  calculateNutritionStatus,
  getLowNutritionMessage,
  getHighNutritionMessage,
} from "@/utils/mealUtils";

export default function ReportSummary() {
  const { data: dailyMealData } = useDailyMeal();
  const dailyMeal = dailyMealData || mockDailyMealData;
  const router = useRouter();

  const nutritionStatus = calculateNutritionStatus(dailyMeal.total);
  const lowMessage = getLowNutritionMessage(nutritionStatus);
  const highMessage = getHighNutritionMessage(nutritionStatus);

  return (
    <ContentsWrapper title="리포트 요약">
      <div className="flex w-full flex-col rounded-xl bg-white p-4 shadow-md">
        <h3 className="text-primary-600 mb-3 text-lg font-semibold">오늘의 영양 상태</h3>

        {!dailyMeal.total ? (
          <p className="py-3 text-neutral-500">오늘의 급식 데이터가 없습니다.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {lowMessage && (
              <div className="rounded-lg bg-blue-50 p-3 text-blue-700">
                <p>{lowMessage}</p>
              </div>
            )}

            {highMessage && (
              <div className="rounded-lg bg-amber-50 p-3 text-amber-700">
                <p>{highMessage}</p>
              </div>
            )}

            {!lowMessage && !highMessage && (
              <div className="rounded-lg bg-green-50 p-3 text-green-700">
                <p>오늘의 영양 섭취는 적정 수준입니다.</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-4">
          <Button
            onClick={() => router.push("/recipes")}
            className="bg-primary-500 hover:bg-primary-600 w-full"
          >
            추천 레시피 보러가기
            <FaArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </ContentsWrapper>
  );
}
