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
      className="flex w-[800px] gap-4 border py-6 px-4 rounded"
      key={book?.id}
    >
      <Link href={`/books/${book.id}`}>
        <Image src={book.cover} alt={book.title} width={128} height={204} />
      </Link>
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
  );
}
