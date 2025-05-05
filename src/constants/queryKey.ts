export const QUERY_KEY = {
  PROFILES: ["profiles"],
  DEFAULT_PROFILE: ["defaultProfile"],
  DAILY_MEAL: (profileId: string) => ["dailyMeal", profileId],
};
