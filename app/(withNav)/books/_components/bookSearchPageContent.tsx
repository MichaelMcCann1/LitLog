import BookBox from "@/components/bookBox/bookBox";
import { Skeleton } from "@/components/ui/skeleton";
import { getBooksList, getUsersBookshelves } from "@/lib/actions";
import { getSearchResultsText } from "@/lib/utils";
import { Session } from "next-auth";
import React from "react";

interface Props {
  session: Session | null;
  search: string;
}

export default async function BookSearchPageContent({
  session,
  search,
}: Props) {
  const [booksData, shelfData] = await Promise.all([
    getBooksList(session?.user?.name, search),
    getUsersBookshelves(session?.user?.name),
  ]);

  return (
    <div className="flex flex-col items-center gap-12 py-12 px-4">
      <h1 className="text-xl md:text-3xl font-medium">
        {getSearchResultsText(search, booksData.length)}
      </h1>
      <div className="flex flex-col gap-4 items-center">
        {booksData?.map((book) => (
          <BookBox
            key={book.google_book_id}
            session={session}
            book={book}
            shelfData={shelfData}
          />
        ))}
      </div>
    </div>
  );
}

BookSearchPageContent.Skeleton = () => {
  return (
    <div className="flex flex-col items-center gap-12 py-12 px-4">
      <Skeleton className="h-5 md:h-6 w-[300px]" />
      <div className="flex flex-col gap-4 items-center w-full">
        <BookBox.Skeleton />
        <BookBox.Skeleton />
        <BookBox.Skeleton />
      </div>
    </div>
  );
};
