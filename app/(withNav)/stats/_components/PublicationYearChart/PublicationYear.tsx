import { getPublicationDateDistribution } from "@/lib/actions/statsActions";
import React from "react";
import PublicationYearBarChart from "./PublicationYearBarChart";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  username: string | null | undefined;
}

export default async function PublicationYear({ username }: Props) {
  const publicationYears = await getPublicationDateDistribution(username);

  return (
    <>
      {publicationYears && (
        <PublicationYearBarChart yearData={publicationYears} />
      )}
    </>
  );
}

PublicationYear.Skeleton = function PublicationYearSkeleton() {
  return (
    <div className="flex flex-col border items-center py-6 px-3 gap-8 flex-1 rounded-lg">
      <Skeleton className="h-7 w-[165px]" />
      <Skeleton className="w-full aspect-video max-w-[600px]" />
    </div>
  );
};
