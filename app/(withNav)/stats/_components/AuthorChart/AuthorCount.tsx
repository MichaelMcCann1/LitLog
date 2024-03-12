import { getAuthorsDistribution } from "@/lib/actions/statsActions";
import React from "react";
import AuthorsBarChart from "./AuthorsBarChart";
import { Skeleton } from "@/components/ui/skeleton";
import { isEmpty } from "lodash";

interface Props {
  username: string | null | undefined;
}

export default async function AuthorCount({ username }: Props) {
  const authorsDistribution = await getAuthorsDistribution(username);

  if (!authorsDistribution || isEmpty(authorsDistribution)) {
    return <></>;
  }

  return <AuthorsBarChart authors={authorsDistribution} />;
}

AuthorCount.Skeleton = function AuthorCountSkeleton() {
  return (
    <div className="flex flex-col border items-center py-6 px-3 gap-8 flex-1 rounded-lg">
      <Skeleton className="h-7 w-[165px]" />
      <Skeleton className="w-full aspect-video max-w-[600px]" />
    </div>
  );
};
