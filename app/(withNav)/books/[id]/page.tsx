import { getBook } from "@/lib/googleBooksAPI";
import Image from "next/image";
import React from "react";
import BookDescription from "./_components/bookDescription";
import BookCategories from "./_components/bookCategories";
import ShelfOrganizer from "@/components/bookBox/components/shelfOrganizer";
import { auth } from "@/auth";
import { getUsersBookData, getUsersBookshelves } from "@/lib/actions";
import BookInfo from "./_components/bookInfo";

export default async function page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const session = await auth();
  const bookData = await getBook(params.id);
  const bookshelves = await getUsersBookshelves(session?.user?.name);
  const usersBookData = await getUsersBookData(
    session?.user?.name,
    bookData.id
  );

  return (
    <div className="py-10 px-4 flex justify-center">
      <div className="flex gap-8 max-w-[900px] items-start">
        <div className="flex flex-col gap-2 flex-shrink-0">
          <Image
            src={bookData.cover}
            alt={bookData.title}
            width={300}
            height={450}
            className="shadow-lg"
          />
          <ShelfOrganizer
            initialAssignedShelf={usersBookData?.shelf_name}
            bookshelves={bookshelves}
            book_id={bookData.id}
            title={bookData.title}
            cover={bookData.cover}
            user={session?.user}
          />
        </div>
        <div className="flex flex-col">
          <BookInfo
            title={bookData.title}
            authors={bookData.authors}
            averageRating={bookData.averageRating}
            ratingsCount={bookData.ratingsCount}
            pageCount={bookData.pageCount}
            publisher={bookData.publisher}
            publisherDate={bookData.publisherDate}
          />
          <div className="flex flex-col gap-4">
            {bookData.description && (
              <BookDescription description={bookData.description} />
            )}
            {bookData.categories && (
              <BookCategories categories={bookData.categories} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
