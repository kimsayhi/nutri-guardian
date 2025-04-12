import MainProfile from "@/components/domain/main/mainProfile";
import DailyReport from "@/components/domain/main/dailyReport";
import { AiOutlineRight } from "react-icons/ai";

export default function MainPage() {
  return (
    <>
      <main className="relative mx-auto min-h-screen w-full">
        {/* 급식 정보 카드 */}
        <MainProfile />
        <div className="relative z-10 h-full rounded-t-xl bg-white py-10">
          {/* 오늘의 영양 리포트 */}
          <DailyReport />
          {/* 오늘의 영양 밸런스 메뉴 */}
          <section className="px-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">오늘의 영양 밸런스 메뉴</h2>
              <button className="flex items-center gap-0.5 text-sm text-gray-500">
                <span>더 보기</span>
                <AiOutlineRight />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                <div className="h-32 bg-gray-200"></div>
              </div>
              <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                <div className="h-32 bg-gray-200"></div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
