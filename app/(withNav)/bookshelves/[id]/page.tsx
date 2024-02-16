import { auth } from "@/auth";
import BookBox from "@/components/bookBox/bookBox";
import {
  getBookShelfName,
  getBooksFromShelf,
  getUsersBookshelves,
} from "@/lib/actions";
import React from "react";

export default async function book({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const session = await auth();
  const shelfName = await getBookShelfName(session?.user?.name, params.id);
  const bookData = await getBooksFromShelf(session?.user?.name, params.id);
  const bookshelfData = await getUsersBookshelves(session?.user?.name);

  return (
    <div className="flex flex-col items-center gap-12 py-12 px-4">
      <h1 className="text-xl md:text-3xl font-medium">{shelfName?.shelf_name}</h1>
      <div className="flex flex-col gap-4 items-center">
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
