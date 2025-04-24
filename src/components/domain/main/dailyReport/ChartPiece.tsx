"use client";

import { cn } from "@/utils/cn";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Chart.js 컴포넌트 등록
ChartJS.register(ArcElement);

interface ChartPieceProps {
  nutritionPercent: number;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  color: string;
}

export default function ChartPiece({ nutritionPercent, position, color }: ChartPieceProps) {
  // 차트
  const data = {
    labels: ["전체", "영양소"],
    datasets: [
      {
        data: [nutritionPercent, 100 - nutritionPercent],
        backgroundColor: [color, "#fff"],
        borderColor: "transparent",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: "90%", // 도넛 두께
    circumference: 90, // 전체 원
    maintainAspectRatio: false,
    padding: 10,
  };

  const variant = {
    "top-left": "-top-1 -left-1 -rotate-90",
    "top-right": "-top-1 -right-1",
    "bottom-left": "-bottom-1 -left-1 rotate-180",
    "bottom-right": "-bottom-1 -right-1 rotate-90",
  };
  return (
    <div className={cn("absolute h-[80px] w-[80px]", variant[position])}>
      <Doughnut data={data} options={options} />
    </div>
  );
}
