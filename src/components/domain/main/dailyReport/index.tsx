"use client";
import ContentsWrapper from "@/components/shared/ContentsWrapper";
import ProgressBar from "@/components/shared/progressBar";
import useDailyNutritionInfo from "@/hooks/useDailyNutritionInfo";
import useDefaultProfileQuery from "@/hooks/query/useDefaultProfileQuery";
export default function DailyReport() {
  const { nutritionInfo } = useDailyNutritionInfo();

  // 영양소 상태 판단 함수 (±10% 기준)
  const getNutritionStatus = (current: number, recommended: number) => {
    const percentage = (current / recommended) * 100;

    if (percentage >= 90 && percentage <= 110) {
      return { text: "정상", color: "text-green-600", bgColor: "bg-green-100" };
    } else if (percentage > 110) {
      return { text: "과다", color: "text-red-600", bgColor: "bg-red-100" };
    } else {
      return { text: "부족", color: "text-amber-600", bgColor: "bg-amber-100" };
    }
  };
  const { data: defaultProfile } = useDefaultProfileQuery();
  const hasProfile = !!defaultProfile;

  return (
    <ContentsWrapper title="오늘의 영양 리포트" isBlur={!hasProfile}>
      <div className="bg-primary-50 flex flex-col gap-2 rounded-xl">
        {nutritionInfo.map((nutrition) => {
          const status = getNutritionStatus(nutrition.dailyNutrition, nutrition.nutritionNeeds);
          const percentValue = Math.round(
            (nutrition.dailyNutrition / nutrition.nutritionNeeds) * 100
          );
          const diffValue = nutrition.dailyNutrition - nutrition.nutritionNeeds;
          const difference = diffValue.toFixed(1);
          const unit = nutrition.name === "총칼로리" ? "kcal" : "g";

          return (
            <div key={nutrition.name} className="flex flex-col gap-2 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: nutrition.color }}
                  ></div>
                  <h2 className="font-semibold text-neutral-800">{nutrition.name}</h2>
                </div>
                <div
                  className={`rounded-full px-3 py-0.5 text-xs font-medium ${status.bgColor} ${status.color}`}
                >
                  {status.text}
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <div className="flex basis-1/3 flex-col">
                  <span className="text-xs text-gray-500">권장</span>
                  <span className="text-neutral-900">
                    {nutrition.nutritionNeeds} {unit}
                  </span>
                </div>
                <div className="flex basis-1/3 flex-col">
                  <span className="text-xs text-gray-500">현재</span>
                  <span className="text-neutral-900">
                    {nutrition.dailyNutrition} {unit}
                  </span>
                </div>
                <div className="flex basis-1/3 flex-col">
                  <span className="text-xs text-gray-500">차이</span>
                  <span className={diffValue >= 0 ? "text-green-600" : "text-red-600"}>
                    {diffValue > 0 ? "+" : ""}
                    {difference} {unit}
                  </span>
                </div>
              </div>

              <div className="mt-1">
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-gray-500">섭취율</span>
                  <span className="font-medium" style={{ color: nutrition.color }}>
                    {percentValue}%
                  </span>
                </div>
                <ProgressBar progress={nutrition.nutritionPercent} color={nutrition.color} />
              </div>
            </div>
          );
        })}
      </div>
    </ContentsWrapper>
  );
}
