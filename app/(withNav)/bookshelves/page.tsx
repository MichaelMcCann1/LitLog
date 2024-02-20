import { auth } from "@/auth";
import React, { Suspense } from "react";
import BookshelvesPageContent from "./_components/bookshelvesPageContent";
import NoUserAlert from "@/components/NoUserAlert/NoUserAlert";

export default async function page() {
  const session = await auth();

  return (
    <div className="flex flex-col gap-20 items-center py-10 px-4">
      {!session && (
        <NoUserAlert
          message="You are viewing a demo user's bookshelves. Register or log in to keep
        track of your own bookshelves."
        />
      )}
      <h1 className="text-3xl">My Bookshelves</h1>
      <Suspense fallback={<BookshelvesPageContent.Skeleton />}>
        <BookshelvesPageContent
          username={session?.user?.name || process.env.DEMO_ACCOUNT_USERNAME}
        />
      </Suspense>
    </div>
  );
}
