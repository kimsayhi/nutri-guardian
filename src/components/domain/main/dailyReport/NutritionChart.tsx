"use client";
import useDailyNutritionInfo from "@/hooks/useDailyNutritionInfo";
import ChartPiece from "./ChartPiece";
import { DailyMealData } from "@/types/meal";
import { ProfileData } from "@/types/profile";
import { cn } from "@/utils/cn";

interface NutritionChartProps {
  dailyMealData?: DailyMealData | null;
  profileData?: ProfileData | null;
}

export default function NutritionChart({ dailyMealData, profileData }: NutritionChartProps) {
  const { nutritionInfo } = useDailyNutritionInfo();
  return (
    <div className="flex justify-center p-1">
      <div
        className={cn(
          "relative h-[160px] w-[160px] shrink-0",
          !profileData || (!dailyMealData && "blur-sm")
        )}
      >
        {nutritionInfo.map((nutrition) => (
          <ChartPiece
            key={nutrition.position}
            nutritionPercent={nutrition.nutritionPercent}
            position={
              nutrition.position as "top-left" | "top-right" | "bottom-left" | "bottom-right"
            }
            color={nutrition.color}
          />
        ))}
        <div className="absolute flex h-full w-full items-center justify-center">
          <div className="flex flex-col text-sm">
            {nutritionInfo.map((nutrition) => (
              <div key={nutrition.position} className="flex items-center gap-1">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: nutrition.color }}
                ></div>
                <span>{nutrition.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
