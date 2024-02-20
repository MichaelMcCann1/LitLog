import { auth } from "@/auth";
import { Suspense } from "react";
import BookSearchPageContent from "./_components/bookSearchPageContent";

export default async function page({
  searchParams,
}: {
  searchParams: {
    query: string;
  };
}) {
  const session = await auth();

  return (
    <Suspense fallback={<BookSearchPageContent.Skeleton />}>
      <BookSearchPageContent session={session} search={searchParams.query} />
    </Suspense>
  );
}
