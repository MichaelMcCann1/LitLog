"use client";

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { BookDistribution } from "@/lib/actions/statsActions";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  pageData: BookDistribution[] | undefined;
}

export default function PageCountPieChart({ pageData }: Props) {
  const data = {
    labels: pageData?.map((bucket) => bucket.page_count_bucket),
    datasets: [
      {
        label: "# of Books",
        data: pageData?.map((bucket) => bucket.book_count),
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 3,
      },
    ],
  };

  return <Pie data={data} />;
}
