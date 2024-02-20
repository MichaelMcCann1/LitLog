import BookBox from "@/components/bookBox/bookBox";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getBookShelfName,
  getBooksFromShelf,
  getUsersBookshelves,
} from "@/lib/actions";
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
    getBookShelfName(session?.user?.name, bookshelfId),
    getBooksFromShelf(session?.user?.name, bookshelfId),
    getUsersBookshelves(session?.user?.name),
  ]);

  return (
    <div className="flex flex-col items-center gap-12 py-12 px-4">
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
