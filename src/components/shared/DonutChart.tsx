"use client";

import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, ChartOptions } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DonutChartProps {
  name?: string;
  currentValue?: number;
  totalValue?: number;
}

interface CustomChartOptions extends ChartOptions<"doughnut"> {
  cutout?: string;
}

export default function DonutChart({
  name = "영양소",
  currentValue = 0,
  totalValue = 100,
}: DonutChartProps) {
  const ratio = (currentValue / totalValue) * 100;

  let chartColor;
  if (ratio >= 140) {
    chartColor = "#ef4444";
  } else if (ratio >= 120) {
    chartColor = "#f59e0b";
  } else if (ratio >= 80) {
    chartColor = "#10b981";
  } else if (ratio >= 60) {
    chartColor = "#f59e0b";
  } else {
    chartColor = "#ef4444";
  }

  const chartData: ChartData<"doughnut"> = {
    labels: ["섭취량", "남은 목표"],
    datasets: [
      {
        data:
          currentValue >= totalValue
            ? [currentValue, 0]
            : [currentValue, totalValue - currentValue],
        backgroundColor: [chartColor, "#f3f4f6"],
        borderWidth: 0,
      },
    ],
  };

  // 차트 옵션 설정
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

  const centerTextPlugin = {
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
      ctx.fillText(name, width / 2, height / 2);
      ctx.save();
    },
  };

  return (
    <div className="h-full w-full">
      <Doughnut data={chartData} options={chartOptions} plugins={[centerTextPlugin]} />
    </div>
  );
}
