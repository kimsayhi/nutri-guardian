"use client";

import useDefaultProfileQuery from "@/hooks/query/useDefaultProfileQuery";
import DailyMenu from "./DailyMenu";
import Profile from "./Profile";
import NoProfile from "./NoProfile";

export default function MainProfile() {
  const { data: defaultProfile } = useDefaultProfileQuery();
  return (
    <>
      {defaultProfile ? (
        <>
          <div className="h-[310px]"></div>
          <div className="fixed top-[60px] flex w-full justify-center gap-2 px-4 py-10 shadow-sm md:top-[64px] lg:top-[68px]">
            <DailyMenu />
            <Profile defaultProfile={defaultProfile} />
          </div>
        </>
      ) : (
        <NoProfile />
      )}
    </>
  );
}
