"use client";

import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { BookDistribution } from "@/lib/actions/statsActions";
import StatWrapper from "../StatWrapper";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ChartDataLabels
);

const options = {
  plugins: {
    datalabels: {
      align: "end" as const,
      offset: 15,
      color: "black",
      font: {
        size: 18,
        weight: 500,
      },
    },
  },
};

interface Props {
  pageData: BookDistribution[];
}

export default function PageCountPieChart({ pageData }: Props) {
  const data = {
    labels: pageData?.map((bucket) => bucket.page_count_bucket),
    datasets: [
      {
        label: "# of Books",
        data: pageData?.map((bucket) => bucket.book_count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(2, 132, 199, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
        ],
        borderWidth: 3,
      },
    ],
  };

  return (
    <StatWrapper title="Page Count Distribution">
      <div className="w-full max-w-[400px] aspect-square">
        <Pie data={data} options={options} />
      </div>
    </StatWrapper>
  );
}
