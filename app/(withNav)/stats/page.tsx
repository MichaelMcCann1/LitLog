import { auth } from "@/auth";
import NoUserAlert from "@/components/NoUserAlert/NoUserAlert";
import React, { Suspense } from "react";
import KpiSection from "./_components/KPIs/KpiSection";
import PageDistribution from "./_components/PageDistribution/PageDistribution";
import AuthorCount from "./_components/AuthorChart/AuthorCount";
import PublicationYear from "./_components/PublicationYearChart/PublicationYear";

export default async function page() {
  const session = await auth();
  const username = session?.user?.name || process.env.DEMO_ACCOUNT_USERNAME;

  return (
    <div className="flex flex-col gap-20 items-center py-10 px-4">
      {!session && (
        <NoUserAlert message="You are viewing the reading stats for a demo user. Register or log in to see your personal reading stats." />
      )}
      <h1 className="text-3xl">My Stats</h1>
      <div className="flex flex-col gap-6 w-full max-w-[700px]">
        <KpiSection username={username} />
        <Suspense fallback={<PageDistribution.Skeleton />}>
          <PageDistribution username={username} />
        </Suspense>
        <Suspense fallback={<AuthorCount.Skeleton />}>
          <AuthorCount username={username} />
        </Suspense>
        <Suspense fallback={<PublicationYear.Skeleton />}>
          <PublicationYear username={username} />
        </Suspense>
      </div>
    </div>
  );
}
