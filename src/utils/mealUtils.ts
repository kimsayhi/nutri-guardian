import { MealInfoData } from "@/types/api/meal";
import { DailyMealData } from "@/types/meal";
import dayjs from "dayjs";

/**
 * 영양소 정보 문자열에서 특정 영양소 값 추출하고 소수점 첫째 자리까지만 반환
 * @param ntrInfo 영양소 정보 문자열
 * @param key 추출할 영양소 키
 * @returns 추출된 영양소 값
 */
export function extractNutritionValue(ntrInfo: string, key: string): number {
  const regex = new RegExp(`${key}\\s*:\\s*([0-9.]+)`);
  const match = ntrInfo.match(regex);
  const value = match ? parseFloat(match[1]) : 0;
  // 소수점 첫째 자리까지 반올림
  return Number(value.toFixed(1));
}

/**
 * 칼로리 문자열에서 숫자만 추출하고 소수점 첫째 자리까지만 반환
 * @param calInfo 칼로리 정보 문자열 (예: "1026.9 Kcal")
 * @returns 숫자 값 (소수점 첫째 자리까지)
 */
export function extractCalories(calInfo: string): number {
  const value = parseFloat(calInfo.replace(/[^0-9.]/g, ""));
  // 소수점 첫째 자리까지 반올림
  return Number(value.toFixed(1));
}

/**
 * 알레르기 정보를 나타내는 괄호와 숫자 제거
 * @param text 원본 텍스트 (예: "비엔나떡볶음 (2.5.6.10.12.13)")
 * @returns 알레르기 정보가 제거된 텍스트 (예: "비엔나떡볶음")
 */
export function removeAllergyInfo(text: string): string {
  // 괄호 안에 숫자, 점, 쉼표만 있는 경우 모두 제거
  // 예: "비엔나떡볶음 (2.5.6.10.12.13.15.16)" -> "비엔나떡볶음"
  // 예: "참나물겉절이 (5.6.13)" -> "참나물겉절이"
  return text.replace(/\s*\([0-9.,]+\)/g, "").trim();
}

/**
 * 요리명 문자열을 배열로 변환
 * @param dishName 요리명 문자열 (예: "비엔나떡볶음<br/>기장밥")
 * @returns 요리명 배열
 */
export function parseDishNames(dishName: string): string[] {
  const dishes = dishName.split("<br/>").map((item) => item.trim());
  // 알레르기 정보 제거
  return dishes.map((dish) => removeAllergyInfo(dish));
}

/**
 * API 응답 데이터를 가공하여 필요한 형태로 변환
 * @param mealsData API 응답 데이터 배열
 * @param dateString 날짜 문자열 (YYYYMMDD 형식)
 * @returns 가공된 일별 급식 데이터
 */
export function formatDailyMealData(mealsData: MealInfoData[], dateString: string): DailyMealData {
  // 중식과 석식 데이터 분류
  const lunchData = mealsData.find((meal) => meal.MMEAL_SC_CODE === "2");
  const dinnerData = mealsData.find((meal) => meal.MMEAL_SC_CODE === "3");

  // 중식 데이터 가공
  const lunch = lunchData
    ? {
        menu: parseDishNames(lunchData.DDISH_NM),
        calories: extractCalories(lunchData.CAL_INFO),
        nutrition: {
          carbs: extractNutritionValue(lunchData.NTR_INFO, "탄수화물\\(g\\)"),
          protein: extractNutritionValue(lunchData.NTR_INFO, "단백질\\(g\\)"),
          fat: extractNutritionValue(lunchData.NTR_INFO, "지방\\(g\\)"),
        },
      }
    : null;

  // 석식 데이터 가공
  const dinner = dinnerData
    ? {
        menu: parseDishNames(dinnerData.DDISH_NM),
        calories: extractCalories(dinnerData.CAL_INFO),
        nutrition: {
          carbs: extractNutritionValue(dinnerData.NTR_INFO, "탄수화물\\(g\\)"),
          protein: extractNutritionValue(dinnerData.NTR_INFO, "단백질\\(g\\)"),
          fat: extractNutritionValue(dinnerData.NTR_INFO, "지방\\(g\\)"),
        },
      }
    : null;

  // 중식과 석식 영양소 합산
  const total = {
    calories: Number(((lunch?.calories || 0) + (dinner?.calories || 0)).toFixed(1)),
    nutrition: {
      carbs: Number(((lunch?.nutrition?.carbs || 0) + (dinner?.nutrition?.carbs || 0)).toFixed(1)),
      protein: Number(
        ((lunch?.nutrition?.protein || 0) + (dinner?.nutrition?.protein || 0)).toFixed(1)
      ),
      fat: Number(((lunch?.nutrition?.fat || 0) + (dinner?.nutrition?.fat || 0)).toFixed(1)),
    },
  };

  // 가공된 데이터 생성
  return {
    lunch,
    dinner,
    total,
    date: dayjs(dateString).format("YYYY-MM-DD"),
  };
}
