import useDailyMeal from "@/hooks/query/useDailyMeal";

export default function DailyMenu() {
  const { data: dailyMeal } = useDailyMeal();
  console.log(dailyMeal);
  return (
    <div className="flex h-[230px] w-1/2 flex-col rounded-xl bg-white p-3">
      <div className="flex w-full justify-center text-lg font-semibold">
        <span className="border-primary-900 flex w-1/2 items-center justify-center border-b-2 py-[3px]">
          중식
        </span>
        <span className="flex w-1/2 items-center justify-center border-b-2 border-neutral-500 py-[3px] text-neutral-500">
          석식
        </span>
      </div>
      <ul className="flex flex-col px-3 py-2.5 text-sm font-semibold">
        <li>흑미밥</li>
        <li>오징어국</li>
        <li>제육볶음</li>
        <li>고등어 순살 조림</li>
        <li>배추김치</li>
        <li>요구르트</li>
      </ul>
    </div>
  );
}
