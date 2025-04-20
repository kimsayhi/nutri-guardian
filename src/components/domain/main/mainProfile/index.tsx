"use client";

import useDefaultProfileQuery from "@/hooks/query/useDefaultProfileQuery";
import DailyMeal from "./DailyMeal";
import Profile from "./Profile";
import NoProfile from "./NoProfile";

export default function MainProfile() {
  const { data: defaultProfile } = useDefaultProfileQuery();
  return (
    <>
      {defaultProfile ? (
        <>
          <div className="sticky top-[60px] flex w-full flex-col gap-2 px-4 py-10 shadow-sm md:top-[64px] md:flex-row lg:top-[68px]">
            <DailyMeal />
            <Profile defaultProfile={defaultProfile} />
          </div>
        </>
      ) : (
        <NoProfile />
      )}
    </>
  );
}
