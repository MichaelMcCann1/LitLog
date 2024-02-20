import { auth } from "@/auth";
import React, { Suspense } from "react";
import BookshelvesPageContent from "./_components/bookshelvesPageContent";

export default async function page() {
  const session = await auth();

  return (
    <div className="flex flex-col gap-20 items-center py-10 px-4">
      <h1 className="text-3xl">My Bookshelves</h1>
      <Suspense fallback={<BookshelvesPageContent.Skeleton />}>
        <BookshelvesPageContent username={session?.user?.name} />
      </Suspense>
    </div>
  );
}
