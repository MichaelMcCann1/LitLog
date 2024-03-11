"use client";

import { Dictionary } from "lodash";
import React from "react";
import { Scatter } from "react-chartjs-2";
import StatWrapper from "./StatWrapper";
import { TooltipItem } from "chart.js";

const options = {
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      displayColors: false,
      callbacks: {
        label: (context: TooltipItem<"scatter">) => {
          return `Year: ${context.parsed.x}  Books: ${context.parsed.y}`;
        },
      },
    },
    datalabels: {
      labels: {
        title: null
      }
    }
  },
  scales: {
    y: {
      title: {
        display: true,
        text: 'Books Read'
      },
      beginAtZero: true,
      ticks: {
        precision: 0,
      },
    },
    x: {
      title: {
        display: true,
        text: 'Publication Year'
      },
      ticks: {
        callback: (value: string | number) => value,
      },
    },
  },
};

interface Props {
  yearData: Dictionary<number> | undefined;
}

export default function PublicationYearBarChart({ yearData }: Props) {
  const data = {
    datasets: [
      {
        label: "Publication Year",
        data: Object.keys(yearData as object).map((year) => {
          return {
            x: Number(year),
            y: yearData?.[Number(year)],
          };
        }),
        backgroundColor: "rgb(2, 132, 199)",
      },
    ],
  };

  return (
    <StatWrapper title="Publication Year">
      <Scatter data={data} options={options} />
    </StatWrapper>
  );
}
