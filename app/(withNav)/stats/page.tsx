import { auth } from "@/auth";
import NoUserAlert from "@/components/NoUserAlert/NoUserAlert";
import React, { Suspense } from "react";
import StatsPageContent from "./_components/StatsPageContent";

export default async function page() {
  const session = await auth();

  return (
    <div className="flex flex-col gap-20 items-center py-10 px-4">
      {!session && (
        <NoUserAlert message="You are viewing the reading stats for a demo user. Register or log in to see your personal reading stats." />
      )}
      <h1 className="text-3xl">My Stats</h1>
      <Suspense fallback={<StatsPageContent.Skeleton />}>
        <StatsPageContent
          username={session?.user?.name || process.env.DEMO_ACCOUNT_USERNAME}
        />
      </Suspense>
    </div>
  );
}
