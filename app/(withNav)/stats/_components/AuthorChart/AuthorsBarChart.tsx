"use client";

import { Dictionary } from "lodash";
import React from "react";
import { Bar } from "react-chartjs-2";
import StatWrapper from "../StatWrapper";

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
  authors: Dictionary<number>;
}

export default function AuthorsBarChart({ authors }: Props) {
  const labels = Object.keys(authors).slice(0, 9);

  const data = {
    labels,
    datasets: [
      {
        label: "Books",
        data: Object.values(authors).slice(0, 9),
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
