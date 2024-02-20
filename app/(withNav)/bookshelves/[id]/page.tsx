import { auth } from "@/auth";
import React, { Suspense } from "react";
import BookshelfPageContent from "./_components/bookshelfPageContent";

export default async function book({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const session = await auth();

  return (
    <Suspense fallback={<BookshelfPageContent.Skeleton />}>
      <BookshelfPageContent session={session} bookshelfId={params.id} />
    </Suspense>
  );
}
