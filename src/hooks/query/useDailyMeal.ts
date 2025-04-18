import { QUERY_KEY } from "@/constants/queryKey";
import { getMealsByDate } from "@/lib/api/meal";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import useDefaultProfileQuery from "./useDefaultProfileQuery";

export default function useDailyMeal() {
  const { data: defaultProfile } = useDefaultProfileQuery();
  const today = dayjs().format("YYYYMMDD");
  return useQuery({
    queryKey: QUERY_KEY.DAILY_MEAL(defaultProfile?.id ?? ""),
    queryFn: () => {
      if (!defaultProfile) return null;
      return getMealsByDate(defaultProfile.SD_SCHUL_CODE, defaultProfile.ATPT_OFCDC_SC_CODE, today);
    },
    enabled: !!defaultProfile,
  });
}
