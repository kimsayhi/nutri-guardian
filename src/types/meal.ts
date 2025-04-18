/**
 * 일별 급식 데이터 구조
 */
export interface DailyMealData {
  lunch: {
    menu: string[];
    calories: number;
    nutrition: {
      carbs: number;
      protein: number;
      fat: number;
    };
  } | null;
  dinner: {
    menu: string[];
    calories: number;
    nutrition: {
      carbs: number;
      protein: number;
      fat: number;
    };
  } | null;
  total: {
    calories: number;
    nutrition: {
      carbs: number;
      protein: number;
      fat: number;
    };
  } | null;
  date: string;
}

/**
 * 영양소 정보
 */
export interface NutritionInfo {
  carbs: number;
  protein: number;
  fat: number;
}
