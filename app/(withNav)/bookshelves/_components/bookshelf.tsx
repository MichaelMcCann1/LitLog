import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Book } from "@/lib/createTables";
import { times } from "lodash";
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
      className="border border-gray-300 py-4 px-6 rounded-lg flex flex-col gap-8 max-w-[850px] items-center w-full"
    >
      <p className="font-medium text-xl">{bookshelfData.shelf_name}</p>
      {!bookshelfData.bookData?.length ? (
        <div className="h-20 flex justify-center items-center">
          <p className="font-light">No books in this shelf</p>
        </div>
      ) : (
        <>
          <div className="flex gap-6 justify-center flex-wrap">
            {bookshelfData.bookData?.map((book) => (
              <Link
                key={book.google_book_id}
                href={`/books/${book.google_book_id}`}
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  className="shadow-lg h-[200px]"
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

Bookshelf.Skeleton = function BookshelfSekelton() {
  return (
    <div className="border border-gray-300 py-4 px-6 rounded-lg flex flex-col gap-8 max-w-[850px] items-center w-full">
      <Skeleton className="w-[300px] h-5" />
      <div className="flex gap-6 justify-center flex-wrap">
        {times(5).map((e) => (
          <Skeleton key={e} className="w-[120px] h-[200px]" />
        ))}
      </div>
      <Skeleton className="w-[100px] h-10" />
    </div>
  );
};
