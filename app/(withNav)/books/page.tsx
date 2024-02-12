import React from "react";
import { auth } from "@/auth";
import { getBooksList, getUsersBookshelves } from "@/lib/actions";
import BookBox from "@/components/bookBox/bookBox";

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
    <div className="flex flex-col items-center gap-20 pt-10">
      <h1>Search All Books</h1>
      <div className="flex flex-col gap-4 items-center">
        {booksData?.map((book) => (
          <BookBox
            key={book.id}
            session={session}
            book={book}
            shelfData={shelfData}
          />
        ))}
      </div>
    </div>
  );
}
