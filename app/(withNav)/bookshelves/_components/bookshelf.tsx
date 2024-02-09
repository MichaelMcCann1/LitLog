import { Button } from "@/components/ui/button";
import { Book } from "@/lib/createTables";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface BookshelfData {
  bookData:
    | Pick<Book, "title" | "shelf_name" | "google_book_id" | "cover">[]
    | undefined;
  shelf_id: string;
  shelf_name: string;
  book_count: number;
}

interface Props {
  bookshelfData: BookshelfData;
}

export default function Bookshelf({ bookshelfData }: Props) {
  return (
    <div
      key={bookshelfData.shelf_id}
      className="border border-gray-300 py-4 px-8 rounded-lg flex flex-col gap-8 w-[800px] items-center"
    >
      <p className="font-medium text-xl">{bookshelfData.shelf_name}</p>
      {!bookshelfData.bookData?.length ? (
        <div className="h-20 flex justify-center items-center">
          <p className="font-light">No books in this shelf</p>
        </div>
      ) : (
        <>
          <div className="flex gap-8 justify-center">
            {bookshelfData.bookData?.map((book) => (
              <Link
                key={book.google_book_id}
                href={`/books/${book.google_book_id}`}
              >
                <Image
                  src={book.cover}
                  alt={book.title}
                  width={128}
                  height={204}
                  className="shadow-lg"
                />
              </Link>
            ))}
          </div>
          <Button asChild className="w-auto">
            <Link href={`/bookshelves/${bookshelfData.shelf_id}`}>
              View All ({bookshelfData.book_count})
            </Link>
          </Button>
        </>
      )}
    </div>
  );
}
