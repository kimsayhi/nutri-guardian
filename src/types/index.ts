/**
 * 사용자 정보 타입
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

/**
 * 영양 정보 타입
 */
export interface Nutrient {
  name: string;
  amount: number;
  unit: string;
  dailyValue: number; // 일일 권장량 대비 비율 (%)
}

/**
 * 급식 메뉴 타입
 */
export interface MealItem {
  id: string;
  name: string;
  nutrients: Nutrient[];
  calories: number;
}

/**
 * 레시피 타입
 */
export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  nutrients: Nutrient[];
  imageUrl?: string;
  prepTime: number; // 준비 시간 (분)
  cookTime: number; // 조리 시간 (분)
}

/**
 * 영양 리포트 타입
 */
export interface NutritionReport {
  date: string;
  meals: MealItem[];
  totalNutrients: Nutrient[];
  missingNutrients: Nutrient[];
  recommendations: Recipe[];
}
