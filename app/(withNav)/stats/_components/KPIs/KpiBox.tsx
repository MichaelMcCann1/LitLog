import React from "react";
import StatWrapper from "../StatWrapper";
import { Skeleton } from "@/components/ui/skeleton";

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

KpiBox.Skeleton = function KpiBoxSkeleton() {
  return (
    <div className="flex flex-col border items-center py-6 px-3 gap-8 flex-1 rounded-lg">
      <Skeleton className="h-7 max-w-[165px] w-full" />
      <Skeleton className="h-10 max-w-[100px] w-full" />
    </div>
  );
};
