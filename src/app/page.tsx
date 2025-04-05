"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, ChartOptions } from "chart.js";
import MainProfile from "@/components/main/MainProfile";

// Chart.js 필수 컴포넌트 등록
ChartJS.register(ArcElement, Tooltip, Legend);

interface CustomChartOptions extends ChartOptions<"doughnut"> {
  cutout?: string;
}

export default function HomePage() {
  // 탄수화물 차트 데이터 (120%)
  const carbData: ChartData<"doughnut"> = {
    labels: ["섭취량", "남은 목표"],
    datasets: [
      {
        data: [120, 0],
        backgroundColor: ["#f59e0b", "#f3f4f6"],
        borderWidth: 0,
      },
    ],
  };

  // 단백질 차트 데이터 (37%)
  const proteinData: ChartData<"doughnut"> = {
    labels: ["섭취량", "남은 목표"],
    datasets: [
      {
        data: [22, 38],
        backgroundColor: ["#ef4444", "#f3f4f6"],
        borderWidth: 0,
      },
    ],
  };

  // 지방 차트 데이터 (93%)
  const fatData: ChartData<"doughnut"> = {
    labels: ["섭취량", "남은 목표"],
    datasets: [
      {
        data: [74, 6],
        backgroundColor: ["#10b981", "#f3f4f6"],
        borderWidth: 0,
      },
    ],
  };

  // 칼로리 차트 데이터 (105%)
  const calorieData: ChartData<"doughnut"> = {
    labels: ["섭취량", "남은 목표"],
    datasets: [
      {
        data: [2300, 0],
        backgroundColor: ["#10b981", "#f3f4f6"],
        borderWidth: 0,
      },
    ],
  };

  // 차트 공통 옵션
  const chartOptions: CustomChartOptions = {
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
    responsive: true,
    maintainAspectRatio: true,
  };

  // 중앙에 텍스트 넣는 플러그인 만들기
  const centerTextPlugin = (text: string) => {
    return {
      id: "centerText",
      beforeDraw: function (chart: unknown) {
        const chartInstance = chart as {
          width: number;
          height: number;
          ctx: CanvasRenderingContext2D;
        };

        const { width, height, ctx } = chartInstance;

        ctx.restore();
        ctx.font = "10px Arial";
        ctx.fillStyle = "#333333";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText(text, width / 2, height / 2);
        ctx.save();
      },
    };
  };

  return (
    <>
      <main className="mx-auto min-h-screen w-full pb-16">
        {/* 급식 정보 카드 */}
        <MainProfile />
        {/* 오늘의 영양 리포트 */}
        <section className="mb-8 px-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">오늘의 영양 리포트</h2>
            <button className="flex items-center text-sm text-gray-500">
              식사 추가하기
              <svg className="ml-1 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
            </button>
          </div>

          {/* 탄수화물 프로그레스 */}
          <div className="mb-4 rounded-lg bg-white p-4 shadow-sm">
            <div className="flex items-center">
              <div className="relative mr-4 h-20 w-20">
                <Doughnut
                  data={carbData}
                  options={chartOptions}
                  plugins={[centerTextPlugin("탄수화물")]}
                />
              </div>
              <div className="flex-1">
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div>목표</div>
                  <div>현재</div>
                  <div>+/-</div>
                  <div>상태</div>
                  <div className="font-medium">100g</div>
                  <div className="font-medium">120g</div>
                  <div className="font-medium">+20g</div>
                  <div className="font-medium text-yellow-500">과다</div>
                </div>
              </div>
            </div>
          </div>

          {/* 단백질 프로그레스 */}
          <div className="mb-4 rounded-lg bg-white p-4 shadow-sm">
            <div className="flex items-center">
              <div className="relative mr-4 h-20 w-20">
                <Doughnut
                  data={proteinData}
                  options={chartOptions}
                  plugins={[centerTextPlugin("단백질")]}
                />
              </div>
              <div className="flex-1">
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div>목표</div>
                  <div>현재</div>
                  <div>+/-</div>
                  <div>상태</div>
                  <div className="font-medium">60g</div>
                  <div className="font-medium">22g</div>
                  <div className="font-medium">-38g</div>
                  <div className="font-medium text-red-500">매우 부족</div>
                </div>
              </div>
            </div>
          </div>

          {/* 지방 프로그레스 */}
          <div className="mb-4 rounded-lg bg-white p-4 shadow-sm">
            <div className="flex items-center">
              <div className="relative mr-4 h-20 w-20">
                <Doughnut
                  data={fatData}
                  options={chartOptions}
                  plugins={[centerTextPlugin("지방")]}
                />
              </div>
              <div className="flex-1">
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div>목표</div>
                  <div>현재</div>
                  <div>+/-</div>
                  <div>상태</div>
                  <div className="font-medium">80g</div>
                  <div className="font-medium">74g</div>
                  <div className="font-medium">-6g</div>
                  <div className="font-medium text-green-500">적정</div>
                </div>
              </div>
            </div>
          </div>

          {/* 총 열량 프로그레스 */}
          <div className="mb-4 rounded-lg bg-white p-4 shadow-sm">
            <div className="flex items-center">
              <div className="relative mr-4 h-20 w-20">
                <Doughnut
                  data={calorieData}
                  options={chartOptions}
                  plugins={[centerTextPlugin("총 열량")]}
                />
              </div>
              <div className="flex-1">
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div>목표</div>
                  <div>현재</div>
                  <div>+/-</div>
                  <div>상태</div>
                  <div className="font-medium">2200kcal</div>
                  <div className="font-medium">2300kcal</div>
                  <div className="font-medium">+100kcal</div>
                  <div className="font-medium text-green-500">적정</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 리포트 요약 */}
        <div className="mx-4 mb-8 rounded-lg border border-green-100 bg-green-50 p-4">
          <p className="text-sm">
            <span className="font-medium text-red-500">단백질이 매우 부족</span>합니다.
          </p>
          <p className="text-sm">단백질 위주의 식사가 필요합니다.</p>
        </div>

        {/* 오늘의 영양 밸런스 메뉴 */}
        <section className="mb-8 px-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">오늘의 영양 밸런스 메뉴</h2>
            <button className="text-sm text-gray-500">더 보기 &gt;</button>
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
      </main>
    </>
  );
}
