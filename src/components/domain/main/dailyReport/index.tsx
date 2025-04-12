"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, ChartOptions } from "chart.js";
import ReportSummary from "./ReportSummary";
import { FaRegPlusSquare } from "react-icons/fa";
// Chart.js 필수 컴포넌트 등록
ChartJS.register(ArcElement, Tooltip, Legend);

interface CustomChartOptions extends ChartOptions<"doughnut"> {
  cutout?: string;
}
export default function DailyReport() {
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
      <section className="mb-8 px-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">오늘의 영양 리포트</h2>
          <button className="flex items-center gap-1 text-sm text-gray-500">
            <span>식사 추가하기</span>
            <FaRegPlusSquare />
          </button>
        </div>
        <div className="mb-3 flex flex-col gap-1">
          {/* 탄수화물 프로그레스 */}
          <div className="bg-primary-50 rounded-lg p-4 shadow-sm">
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
          <div className="bg-primary-50 rounded-lg p-4 shadow-sm">
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
          <div className="bg-primary-50 rounded-lg p-4 shadow-sm">
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
          <div className="bg-primary-50 rounded-lg p-4 shadow-sm">
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
        </div>
        <ReportSummary />
      </section>
    </>
  );
}
