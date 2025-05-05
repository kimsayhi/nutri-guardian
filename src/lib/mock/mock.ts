import { DailyMealData } from "@/types/meal";
import { Gender, Goal, ProfileData } from "@/types/profile";

// 모의 데이터
export const mockDailyMealData: DailyMealData = {
  lunch: {
    menu: ["쌀밥", "미역국", "불고기", "김치"],
    calories: 650,
    nutrition: {
      carbs: 90,
      protein: 25,
      fat: 15,
    },
  },
  dinner: {
    menu: ["잡곡밥", "된장찌개", "고등어구이", "나물"],
    calories: 580,
    nutrition: {
      carbs: 80,
      protein: 30,
      fat: 17,
    },
  },
  total: {
    calories: 1230,
    nutrition: {
      carbs: 170,
      protein: 55,
      fat: 32,
    },
  },
  date: new Date().toISOString().split("T")[0],
};

export const mockProfileData: ProfileData = {
  id: "mock-profile-id",
  userId: "mock-user-id",
  name: "홍길동",
  schoolName: "모의학교",
  ATPT_OFCDC_SC_CODE: "test",
  SD_SCHUL_CODE: "test",
  weight: 60,
  goal: Goal.BalancedDiet,
  gender: Gender.Male,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  isActive: true,
  isDefault: true,
};
