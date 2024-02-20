import NoUserAlert from "@/components/NoUserAlert/NoUserAlert";
import BookBox from "@/components/bookBox/bookBox";
import { Skeleton } from "@/components/ui/skeleton";
import { getBooksFromShelf } from "@/lib/actions/bookActions";
import {
  getBookShelfName,
  getUsersBookshelves,
} from "@/lib/actions/bookshelfActions";
import { Session } from "next-auth";
import React from "react";

interface Props {
  session: Session | null;
  bookshelfId: string;
}

export default async function BookshelfPageContent({
  session,
  bookshelfId,
}: Props) {
  const [shelfName, bookData, bookshelfData] = await Promise.all([
    getBookShelfName(
      session?.user?.name || process.env.DEMO_ACCOUNT_USERNAME,
      bookshelfId
    ),
    getBooksFromShelf(
      session?.user?.name || process.env.DEMO_ACCOUNT_USERNAME,
      bookshelfId
    ),
    getUsersBookshelves(
      session?.user?.name || process.env.DEMO_ACCOUNT_USERNAME
    ),
  ]);

  return (
    <div className="flex flex-col items-center gap-12 py-12 px-4">
      {!session && (
        <NoUserAlert
          message="You are viewing a demo user's bookshelf. Register or log in to keep
        track of your own bookshelf."
        />
      )}
      <h1 className="text-xl md:text-3xl font-medium">
        {shelfName?.shelf_name}
      </h1>
      <div className="flex flex-col gap-4 items-center w-full">
        {bookData?.map((book) => (
          <BookBox
            key={book.book_id}
            session={session}
            book={book}
            shelfData={bookshelfData}
          />
        ))}
      </div>
    </div>
  );
}

BookshelfPageContent.Skeleton = function BookshelfPageContentSkeleton() {
  return (
    <div className="flex flex-col items-center gap-12 py-12 px-4">
      <Skeleton className="h-6 md:h-8 w-[250px]" />
      <div className="flex flex-col gap-4 items-center w-full">
        <BookBox.Skeleton />
        <BookBox.Skeleton />
        <BookBox.Skeleton />
      </div>
    </div>
  );
};
