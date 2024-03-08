"use client";

import { Dictionary } from "lodash";
import React from "react";
import { Scatter } from "react-chartjs-2";
import StatWrapper from "./StatWrapper";

export const options = {
  scales: {
    y: {
      beginAtZero: true,
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
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  return (
    <StatWrapper title="Publication Year">
      <Scatter data={data} options={options} />
    </StatWrapper>
  );
}
