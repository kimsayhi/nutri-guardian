import { Gender, Goal } from "@/types/profile";

export const GoalLabels: Record<Goal, string> = {
  [Goal.WeightLoss]: "체중감량",
  [Goal.BalancedDiet]: "균형식단",
};

export const GenderLabels: Record<Gender, string> = {
  [Gender.Male]: "남성",
  [Gender.Female]: "여성",
};
