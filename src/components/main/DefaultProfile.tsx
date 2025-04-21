"use client";
import useDefaultProfileQuery from "@/hooks/query/useDefaultProfileQuery";

//로딩 추가하기
export default function DefaultProfile() {
  const { data: defaultProfile } = useDefaultProfileQuery();

  return (
    <>
      <div className="flex flex-col">
        <span className="text-lg font-semibold">{defaultProfile?.schoolName}</span>
        <span className="text-2xl font-bold">{defaultProfile?.name}</span>
      </div>
    </>
  );
}
