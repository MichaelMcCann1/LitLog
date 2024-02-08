import { getGoogleBooksList } from "@/lib/googleBooksAPI";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import BookSearch from "./_components/bookSearch";
import ShelfOrganizer from "./_components/shelfOrganizer";
import { auth } from "@/auth";
import { getBooksList, getUsersBookshelves } from "@/lib/actions";

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
      <BookSearch />
      <div className="flex flex-col gap-4 items-center">
        {booksData?.map((book) => (
          <div className="flex w-[700px] gap-4" key={book?.id}>
            <Link href={`/books/${book.id}`}>
              <Image
                src={book.cover}
                alt={book.title}
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
            <div className="ml-auto">
              <ShelfOrganizer
                bookshelves={shelfData}
                book_id={book.id}
                user={session?.user}
                initialAssignedShelf={book.shelfName}
                title={book.title}
                cover={book.cover}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
