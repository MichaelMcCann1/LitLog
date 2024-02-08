import { auth } from "@/auth";
import { getUsersBooks, getUsersBookshelves } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function page() {
  const session = await auth();
  const bookshelves = await getUsersBookshelves(session?.user?.name);
  const books = await getUsersBooks(session?.user?.name);

  const bookshelvesWithBookData = bookshelves?.map((shelf) => {
    return {
      ...shelf,
      bookData: books?.[shelf.shelf_name],
    };
  });

  return (
    <div className="flex flex-col gap-20 items-center">
      <h1 className="text-3xl pt-10">My BookShelves</h1>

      {bookshelvesWithBookData &&
        bookshelvesWithBookData.map((shelf) => (
          <div key={shelf.shelf_id} className="flex flex-col gap-2">
            <p>{shelf.shelf_name}</p>
            <div className="flex gap-4">
              {shelf.bookData?.map((book) => (
                <Link
                  key={book.google_book_id}
                  href={`/books/${book.google_book_id}`}
                >
                  <Image
                    src={book.cover}
                    alt={book.title}
                    width={128}
                    height={204}
                  />
                  {book.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
