import Image from "next/image";
import Link from "next/link";
import React from "react";
import ShelfOrganizer from "./components/shelfOrganizer";
import { Session } from "next-auth";
import { BookData } from "@/lib/googleBooksAPI";
import { Bookshelf } from "@/lib/createTables";

interface Props {
  shelfData: Omit<Bookshelf, "username" | "email">[] | undefined;
  book: BookData;
  session: Session | null;
}

export default function BookBox({ book, shelfData, session }: Props) {
  return (
    <div className="flex w-[700px] gap-4" key={book?.id}>
      <Link href={`/books/${book.id}`}>
        <Image src={book.cover} alt={book.title} width={128} height={204} />
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
  );
}
