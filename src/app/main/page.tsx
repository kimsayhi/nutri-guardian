import Profile from "@/components/domain/main/profile";
import DailyReport from "@/components/domain/main/dailyReport";
import DailyMeal from "@/components/domain/main/dailyMeal";
import { getDefaultProfile } from "@/actions/profile";
import { QUERY_KEY } from "@/constants/queryKey";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getMealsByDate } from "@/lib/api/meal";
import dayjs from "dayjs";
import { ProfileData } from "@/types/profile";
export default async function MainPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEY.DEFAULT_PROFILE,
    queryFn: getDefaultProfile,
  });
  const defaultProfile = queryClient.getQueryData<ProfileData>(QUERY_KEY.DEFAULT_PROFILE);
  if (defaultProfile) {
    await queryClient.prefetchQuery({
      queryKey: QUERY_KEY.DAILY_MEAL(dayjs().format("YYYYMMDD")),
      queryFn: () =>
        getMealsByDate(
          defaultProfile.SD_SCHUL_CODE,
          defaultProfile.ATPT_OFCDC_SC_CODE,
          dayjs().format("YYYYMMDD")
        ),
    });
  }

  return (
    <>
      <main className="relative mx-auto flex min-h-screen w-full max-w-screen-md flex-col gap-6 px-4 py-4">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Profile />
          <div className="flex flex-col gap-6 py-4">
            <div className="flex flex-col gap-5 md:flex-row md:gap-8">
              <DailyMeal />
              <DailyReport />
            </div>
          </div>
        </HydrationBoundary>
      </main>
    </>
  );
}
