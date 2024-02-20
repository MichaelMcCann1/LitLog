import NoUserAlert from "@/components/NoUserAlert/NoUserAlert";
import BookBox from "@/components/bookBox/bookBox";
import { Skeleton } from "@/components/ui/skeleton";
import { getBooksList } from "@/lib/actions/bookActions";
import { getUsersBookshelves } from "@/lib/actions/bookshelfActions";
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
    getBooksList(
      session?.user?.name || process.env.DEMO_ACCOUNT_USERNAME,
      search
    ),
    getUsersBookshelves(
      session?.user?.name || process.env.DEMO_ACCOUNT_USERNAME
    ),
  ]);

  return (
    <div className="flex flex-col items-center gap-12 py-12 px-4">
      {!session && (
        <NoUserAlert message="You are not logged in. Any books added or removed from a bookshelf will be applied to a demo account. Register to keep track of your books." />
      )}
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

BookSearchPageContent.Skeleton = function BookSearchPageContentSekeleton() {
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
