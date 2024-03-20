"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import StatWrapper from "../StatWrapper";
import { AuthorDistribution } from "@/lib/actions/statsActions";

const options = {
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      displayColors: false,
    },
    datalabels: {
      labels: {
        title: null,
      },
    },
  },
  scales: {
    y: {
      title: {
        display: true,
        text: "Books Read",
      },
      beginAtZero: true,
      ticks: {
        precision: 0,
      },
    },
  },
};

interface Props {
  authors: AuthorDistribution[];
}

export default function AuthorsBarChart({ authors }: Props) {
  const labels = authors.map((element) => element.authors);

  const data = {
    labels,
    datasets: [
      {
        label: "Books",
        data: authors.map((element) => element.count),
        backgroundColor: "rgb(2, 132, 199)",
      },
    ],
  };

  return (
    <StatWrapper title="Most Read Authors">
      <Bar options={options} data={data} />
    </StatWrapper>
  );
}
