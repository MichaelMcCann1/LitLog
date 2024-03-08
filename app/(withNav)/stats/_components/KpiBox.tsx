import React from "react";
import StatWrapper from "./StatWrapper";

interface Props {
  title: string;
  value: number;
}

export default function KpiBox({ title, value }: Props) {
  return (
    <StatWrapper title={title}>
      <p className="text-xl sm:text-4xl">{value.toLocaleString()}</p>
    </StatWrapper>
  );
}
