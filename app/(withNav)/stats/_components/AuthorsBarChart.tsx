"use client";

import { Dictionary } from "lodash";
import React from "react";
import { Bar } from "react-chartjs-2";

interface Props {
  authors: Dictionary<number>;
}

export default function AuthorsBarChart({ authors }: Props) {
  const labels = Object.keys(authors);

  const data = {
    labels,
    datasets: [
      {
        label: "Authors",
        data: Object.values(authors),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Bar data={data} />;
}
