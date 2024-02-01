import { getBooksList } from "@/lib/googleBooksAPI";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import BookSearch from "./_components/bookSearch";

export default async function page({
  searchParams,
}: {
  searchParams: {
    query: string;
  };
}) {
  const booksData = await getBooksList(searchParams.query);

  return (
    <div className="flex flex-col items-center gap-20 pt-10">
      <h1>Search All Books</h1>
      <BookSearch />
      <div className="flex flex-col gap-4 items-center">
        {booksData?.map((book) => (
          <div className="flex w-[700px]" key={book?.id}>
            <Link href={`/books/${book.id}`}>
              <Image
                src={book.cover}
                alt={`${book.title}`}
                width={128}
                height={204}
              />
            </Link>
            <div className="flex flex-col">
              <Link href={`/books/${book.id}`}>{book.title}</Link>
              <p>{book.authors}</p>
              <p>Pages: {book.pageCount}</p>
              <p>Publisher: {book.publisher}</p>
              <p>Publication Date: {book.publisherDate}</p>
              <p>
                Rating: {book.averageRating} ({book.ratingsCount})
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
