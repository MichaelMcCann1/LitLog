import { getPageCountDistribution } from "@/lib/actions/statsActions";
import React from "react";
import PageCountPieChart from "./PageCountPieChart";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  username: string | null | undefined;
}

export default async function PageDistribution({ username }: Props) {
  const pageDistribution = await getPageCountDistribution(username);

  return (
    <>{pageDistribution && <PageCountPieChart pageData={pageDistribution} />}</>
  );
}

PageDistribution.Skeleton = function PageDistributionSkeleton() {
  return (
    <div className="flex flex-col border items-center py-6 px-3 gap-8 flex-1 rounded-lg">
      <Skeleton className="h-7 w-[165px]"/>
      <Skeleton className="w-full aspect-square max-w-[400px]"/>
    </div>
  );
};