import Link from "next/link";
import React from "react";
import ShelfOrganizer from "./components/shelfOrganizer";
import { Session } from "next-auth";
import { Book, Bookshelf } from "@/lib/createTables";
import BookInfo from "@/app/(withNav)/books/[id]/_components/bookInfo";

interface Props {
  shelfData: Omit<Bookshelf, "username" | "email">[] | undefined;
  book: Book;
  session: Session | null;
}

export default function BookBox({ book, shelfData, session }: Props) {
  return (
    <div
      className="flex w-full max-w-[800px] gap-4 border py-6 px-4 rounded"
      key={book?.google_book_id}
    >
      <div className="flex flex-col">
        <Link
          href={`/books/${book.google_book_id}`}
          className="w-[100px] min-w-[100px] md:w-[150px] md:min-w-[150px]"
        >
          <img src={book.cover} alt={book.title} className="w-full" />
        </Link>
      </div>
      <div className="flex flex-col">
        <BookInfo
          title={book.title}
          authors={book.authors}
          pageCount={book.page_count}
          averageRating={book.average_rating}
          ratingsCount={book.ratings_count}
          publisher={book.publisher}
          publisherDate={book.publisher_date}
          id={book.google_book_id}
        />
        <div className="block sm:hidden">
          <ShelfOrganizer
            bookshelves={shelfData}
            user={session?.user}
            initialAssignedShelf={book.shelf_name}
            bookData={book}
          />
        </div>
      </div>
      <div className="hidden sm:block ml-auto">
        <ShelfOrganizer
          bookshelves={shelfData}
          user={session?.user}
          initialAssignedShelf={book.shelf_name}
          bookData={book}
        />
      </div>
    </div>
  );
}
