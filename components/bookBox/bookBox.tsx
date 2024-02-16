import Image from "next/image";
import Link from "next/link";
import React from "react";
import ShelfOrganizer from "./components/shelfOrganizer";
import { Session } from "next-auth";
import { BookData } from "@/lib/googleBooksAPI";
import { Bookshelf } from "@/lib/createTables";
import BookInfo from "@/app/(withNav)/books/[id]/_components/bookInfo";

interface Props {
  shelfData: Omit<Bookshelf, "username" | "email">[] | undefined;
  book: BookData;
  session: Session | null;
}

export default function BookBox({ book, shelfData, session }: Props) {
  return (
    <div
      className="flex w-full max-w-[800px] gap-4 border py-6 px-4 rounded"
      key={book?.id}
    >
      <div className="flex flex-col">
        <Link href={`/books/${book.id}`} className="w-[150px] min-w-[150px]">
          <img src={book.cover} alt={book.title} className="w-full" />
        </Link>
      </div>
      <div className="flex flex-col">
        <BookInfo
          title={book.title}
          authors={book.authors}
          pageCount={book.pageCount}
          averageRating={book.averageRating}
          ratingsCount={book.ratingsCount}
          publisher={book.publisher}
          publisherDate={book.publisherDate}
          id={book.id}
        />
        <div className="block sm:hidden">
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
      <div className="hidden sm:block ml-auto">
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
  );
}
