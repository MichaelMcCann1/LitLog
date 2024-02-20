import React, { Suspense } from "react";
import { auth } from "@/auth";
import BookPageContent from "./_components/bookPageContent";
import NoUserAlert from "@/components/NoUserAlert/NoUserAlert";

export default async function page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const session = await auth();

  return (
    <div className="flex flex-col items-center">
      {!session && (
        <div className="pt-10">
          <NoUserAlert message="You are not logged in. Any books added or removed from a bookshelf will be applied to a demo account. Register to keep track of your books." />
        </div>
      )}
      <div className="py-10 px-3 flex justify-center flex-col md:flex-row gap-4 w-full">
        <Suspense fallback={<BookPageContent.Skeleton />}>
          <BookPageContent user={session?.user} bookId={params.id} />
        </Suspense>
      </div>
    </div>
  );
}
