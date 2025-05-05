import { QUERY_KEY } from "@/constants/queryKey";
import { getMealsByDate } from "@/lib/api/meal";
import { DailyMealData } from "@/types/meal";
import { formatDailyMealData } from "@/utils/mealUtils";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import useDefaultProfileQuery from "./useDefaultProfileQuery";

/**
 * 오늘 날짜의 급식 정보를 가공된 형태로 제공하는 쿼리 훅
 */
export default function useDailyMeal() {
  const { data: defaultProfile } = useDefaultProfileQuery();
  const today = dayjs().format("YYYYMMDD");

  return useQuery({
    queryKey: QUERY_KEY.DAILY_MEAL(defaultProfile?.id ?? ""),
    queryFn: async (): Promise<DailyMealData | null> => {
      if (!defaultProfile) return null;

      const mealsData = await getMealsByDate(
        defaultProfile.SD_SCHUL_CODE,
        defaultProfile.ATPT_OFCDC_SC_CODE,
        today
      );

      if (!mealsData || mealsData.length === 0) {
        console.log("급식 데이터가 없습니다:", {
          교육청코드: defaultProfile.ATPT_OFCDC_SC_CODE,
          학교코드: defaultProfile.SD_SCHUL_CODE,
          날짜: today,
        });
        return {
          lunch: null,
          dinner: null,
          total: null,
          date: dayjs(today).format("YYYY-MM-DD"),
        };
      }

      return formatDailyMealData(mealsData, today);
    },
    enabled: !!defaultProfile,
  });
}
