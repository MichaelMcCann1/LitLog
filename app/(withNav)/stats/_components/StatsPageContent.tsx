import { Skeleton } from "@/components/ui/skeleton";
import {
  getAuthorsDistribution,
  getPageCountDistribution,
  getPublicationDateDistribution,
  getUsersCompletedBooksCount,
  getUsersTotalPageCount,
} from "@/lib/actions/statsActions";
import React from "react";
import PageCountPieChart from "./PageCountPieChart";
import PublicationYearBarChart from "./PublicationYearBarChart";
import AuthorsBarChart from "./AuthorsBarChart";

interface Props {
  username: string | null | undefined;
}

export default async function StatsPageContent({ username }: Props) {
  const bookCount = await getUsersCompletedBooksCount(username);
  const pageCount = await getUsersTotalPageCount(username);
  const pageDistribution = await getPageCountDistribution(username);
  const publicationYears = await getPublicationDateDistribution(username);
  const authorsDistribution = await getAuthorsDistribution(username);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-8">
        <div className="flex flex-col border items-center py-4 px-6 gap-10">
          <p className="text-xl font-medium">Total Books Read</p>
          <p className="text-4xl">{bookCount}</p>
        </div>
        <div className="flex flex-col border items-center py-4 px-6 gap-10">
          <p className="text-xl font-medium">Total Pages Read</p>
          <p className="text-4xl">{pageCount}</p>
        </div>
      </div>
      <PageCountPieChart pageData={pageDistribution} />
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
