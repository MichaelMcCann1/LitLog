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
  const formattedData = Object.keys(authors)
    .map((author) => {
      return {
        label: author,
        count: authors[author],
      };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const labels = formattedData.map((element) => element.label);

  const data = {
    labels,
    datasets: [
      {
        label: "Books",
        data: formattedData.map((element) => element.count),
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
