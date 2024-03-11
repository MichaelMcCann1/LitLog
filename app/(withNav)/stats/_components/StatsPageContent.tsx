import { Skeleton } from "@/components/ui/skeleton";
import {
  getAuthorsDistribution,
  getPageCountDistribution,
  getPublicationDateDistribution,
} from "@/lib/actions/statsActions";
import React from "react";
import PageCountPieChart from "./PageCountPieChart";
import PublicationYearBarChart from "./PublicationYearBarChart";
import AuthorsBarChart from "./AuthorsBarChart";
import TotalBooks from "./TotalBooks";
import TotalPages from "./TotalPages";

interface Props {
  username: string | null | undefined;
}

export default async function StatsPageContent({ username }: Props) {
  const pageDistribution = await getPageCountDistribution(username);
  const publicationYears = await getPublicationDateDistribution(username);
  const authorsDistribution = await getAuthorsDistribution(username);

  return (
    <div className="flex flex-col gap-6 w-full max-w-[700px]">
      <div className="flex gap-6">
        <TotalBooks username={username} />
        <TotalPages username={username} />
      </div>
      {pageDistribution && <PageCountPieChart pageData={pageDistribution} />}
      {authorsDistribution && <AuthorsBarChart authors={authorsDistribution} />}
      <PublicationYearBarChart yearData={publicationYears} />
    </div>
  );
}

StatsPageContent.Skeleton = function StatsPageContentSkeleton() {
  return (
    <div className="flex flex-col gap-8 w-full items-center">
      <Skeleton />
    </div>
  );
};
