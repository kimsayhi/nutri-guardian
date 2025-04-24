import { calculateNutritionNeeds } from "@/utils/calculateNutritionNeeds";
import useDailyMeal from "./query/useDailyMeal";
import useDefaultProfileQuery from "./query/useDefaultProfileQuery";
import { mockDailyMealData, mockProfileData } from "@/lib/mock/mock";

export default function useDailyNutritionInfo() {
  const { data: dailyMealData } = useDailyMeal();
  const { data: profileData } = useDefaultProfileQuery();
  const dailyMeal = dailyMealData || mockDailyMealData;
  const profile = profileData || mockProfileData;
  const { carbsNeeds, proteinNeeds, fatNeeds, caloryNeeds } = calculateNutritionNeeds(
    profile.gender,
    profile.weight
  );

  const nutritionInfo = [
    {
      nutritionPercent: Math.min(100, ((dailyMeal.total?.nutrition.carbs || 0) / carbsNeeds) * 100),
      nutritionNeeds: carbsNeeds,
      dailyNutrition: dailyMeal.total?.nutrition.carbs || 0,
      position: "top-left",
      color: "#3B82F6",
      name: "탄수화물",
    },
    {
      nutritionPercent: Math.min(
        100,
        ((dailyMeal.total?.nutrition.protein || 0) / proteinNeeds) * 100
      ),
      nutritionNeeds: proteinNeeds,
      dailyNutrition: dailyMeal.total?.nutrition.protein || 0,
      position: "top-right",
      color: "#EC4899",
      name: "단백질",
    },
    {
      nutritionPercent: Math.min(100, ((dailyMeal.total?.nutrition.fat || 0) / fatNeeds) * 100),
      nutritionNeeds: fatNeeds,
      dailyNutrition: dailyMeal.total?.nutrition.fat || 0,
      position: "bottom-left",
      color: "#F59E0B",
      name: "지방",
    },
    {
      nutritionPercent: Math.min(100, ((dailyMeal.total?.calories || 0) / caloryNeeds) * 100),
      nutritionNeeds: caloryNeeds,
      dailyNutrition: dailyMeal.total?.calories || 0,
      position: "bottom-right",
      color: "#10B981",
      name: "총칼로리",
    },
  ];
  return { nutritionInfo };
}
