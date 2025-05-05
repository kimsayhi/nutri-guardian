export const calculateNutritionNeeds = (gender: "male" | "female", weightKg: number) => {
  // 1. 기초대사량(BMR) 계산
  let bmr = 0;
  if (gender === "male") {
    bmr = 17.686 * weightKg + 658.2;
  } else if (gender === "female") {
    bmr = 13.384 * weightKg + 692.6;
  }

  // 2. 에너지 필요량 추정 (BMR에 평균 활동계수 1.6 적용)
  const estimatedCalories = bmr * 1.6;

  // 3. 탄단지 권장 비율 (예: 탄60%, 단15%, 지25%)
  const carbRatio = 0.6;
  const proteinRatio = 0.15;
  const fatRatio = 0.25;

  const carbs = Math.round((estimatedCalories * carbRatio) / 4); // 1g = 4kcal
  const protein = Math.round((estimatedCalories * proteinRatio) / 4);
  const fat = Math.round((estimatedCalories * fatRatio) / 9); // 1g = 9kcal

  return {
    caloryNeeds: Math.round(estimatedCalories),
    carbsNeeds: carbs,
    proteinNeeds: protein,
    fatNeeds: fat,
  };
};
