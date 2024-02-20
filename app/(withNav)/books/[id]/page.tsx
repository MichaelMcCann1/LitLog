import React, { Suspense } from "react";
import { auth } from "@/auth";
import BookPageContent from "./_components/bookPageContent";

export default async function page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const session = await auth();

  return (
    <div className="py-10 px-3 flex justify-center flex-col md:flex-row gap-4 w-full">
      <Suspense fallback={<BookPageContent.Skeleton />}>
        <BookPageContent user={session?.user} bookId={params.id} />
      </Suspense>
    </div>
  );
}
