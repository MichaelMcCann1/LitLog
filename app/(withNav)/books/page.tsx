import React from "react";
import { auth } from "@/auth";
import { getBooksList, getUsersBookshelves } from "@/lib/actions";
import BookBox from "@/components/bookBox/bookBox";
import { getSearchResultsText } from "@/lib/utils";

export default async function page({
  searchParams,
}: {
  searchParams: {
    query: string;
  };
}) {
  const session = await auth();
  const booksData = await getBooksList(session?.user?.name, searchParams.query);
  const shelfData = await getUsersBookshelves(session?.user?.name);

  return (
    <div className="flex flex-col items-center gap-12 py-12 px-4">
      <h1 className="text-xl md:text-3xl font-medium">
        {getSearchResultsText(searchParams.query, booksData.length)}
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
