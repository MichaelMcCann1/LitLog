import { getUsersCompletedBooksCount } from "@/lib/actions/statsActions";
import React from "react";
import KpiBox from "./KpiBox";
import NoUserAlert from "@/components/NoUserAlert/NoUserAlert";

interface Props {
  username: string | null | undefined;
}

export default async function TotalBooks({ username }: Props) {
  const bookCount = Number(await getUsersCompletedBooksCount(username));

  if (!bookCount) {
    return (
      <div className="flex justify-center h-[500px] flex-col w-[400px]">
        <NoUserAlert
          message='Your "Read" bookshelf is empty. Add some books to it to see your reading
      stats.'
        />
      </div>
    );
  }

  return <KpiBox title="Total Books Read" value={bookCount} />;
}
