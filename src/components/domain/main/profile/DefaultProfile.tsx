"use client";
import useDefaultProfileQuery from "@/hooks/query/useDefaultProfileQuery";

//로딩 추가하기
export default function DefaultProfile() {
  const { data: defaultProfile } = useDefaultProfileQuery();
  return defaultProfile ? (
    <div className="flex flex-col">
      <span className="text-lg font-semibold">{defaultProfile.schoolName}</span>
      <span className="text-2xl font-bold">{defaultProfile.name}</span>
    </div>
  ) : (
    <div className="flex flex-col">
      <span className="text-lg font-semibold">오른쪽 버튼을 클릭해 </span>
      <span className="text-2xl font-bold">프로필을 추가해주세요</span>
    </div>
  );
}
