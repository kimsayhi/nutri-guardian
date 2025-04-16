"use client";
import DonutChart from "@/components/shared/DonutChart";
import ReportSummary from "./ReportSummary";
import { FaRegPlusSquare } from "react-icons/fa";

export default function DailyReport() {
  // 영양소 데이터
  const nutritionData = [
    {
      name: "탄수화물",
      value: 120,
      total: 100,
      color: "hsl(var(--chart-1))",
      status: "과다",
      statusColor: "text-yellow-500",
    },
    {
      name: "단백질",
      value: 22,
      total: 60,
      color: "hsl(var(--chart-2))",
      status: "매우 부족",
      statusColor: "text-red-500",
    },
    {
      name: "지방",
      value: 74,
      total: 80,
      color: "hsl(var(--chart-3))",
      status: "적정",
      statusColor: "text-green-500",
    },
    {
      name: "총 열량",
      value: 2300,
      total: 2200,
      color: "hsl(var(--chart-4))",
      status: "적정",
      statusColor: "text-green-500",
    },
  ];

  return (
    <>
      <section className="mb-8 px-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">오늘의 영양 리포트</h2>
          <button className="flex items-center gap-1 text-sm text-gray-500">
            <span>식사 추가하기</span>
            <FaRegPlusSquare />
          </button>
        </div>
        <div className="mb-3 flex flex-col gap-1">
          {nutritionData.map((item, index) => (
            <div key={index} className="bg-primary-50 rounded-lg p-4 shadow-sm">
              <div className="flex items-center">
                <div className="relative mr-4 h-20 w-20">
                  <DonutChart name={item.name} currentValue={item.value} totalValue={item.total} />
                </div>
                <div className="flex-1">
                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    <div>목표</div>
                    <div>현재</div>
                    <div>+/-</div>
                    <div>상태</div>
                    <div className="font-medium">
                      {item.name === "총 열량" ? `${item.total}kcal` : `${item.total}g`}
                    </div>
                    <div className="font-medium">
                      {item.name === "총 열량" ? `${item.value}kcal` : `${item.value}g`}
                    </div>
                    <div className="font-medium">
                      {item.value > item.total
                        ? `+${item.value - item.total}`
                        : `${item.value - item.total}`}
                      {item.name === "총 열량" ? `kcal` : `g`}
                    </div>
                    <div className={`font-medium ${item.statusColor}`}>{item.status}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ReportSummary />
      </section>
    </>
  );
}
