import ShelfOrganizer from "@/components/bookBox/components/shelfOrganizer";
import { getUsersBookData, getUsersBookshelves } from "@/lib/actions";
import { getGoogleBookData } from "@/lib/googleBooksAPI";
import React from "react";
import BookInfo from "./bookInfo";
import BookDescription from "./bookDescription";
import BookCategories from "./bookCategories";
import { User } from "next-auth";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  user: User | undefined;
  bookId: string;
}

export default async function BookPageContent({ user, bookId }: Props) {
  const [bookData, bookshelves] = await Promise.all([
    getGoogleBookData(bookId),
    getUsersBookshelves(user?.name),
  ]);
  const usersBookData = await getUsersBookData(
    user?.name,
    bookData.google_book_id
  );

  return (
    <>
      <div className="flex md:gap-8 gap-3 max-w-[900px] items-start">
        <div className="flex flex-col gap-2 flex-[1.1_1_0] md:flex-[0_0_auto]">
          <img
            src={bookData.cover}
            alt={bookData.title}
            className="shadow-lg w-[300px]"
          />
          <div className="flex-col hidden md:flex">
            <ShelfOrganizer
              initialAssignedShelf={usersBookData?.shelf_name}
              bookshelves={bookshelves}
              user={user}
              bookData={bookData}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-1 flex-[2]">
          <BookInfo
            title={bookData.title}
            authors={bookData.authors}
            averageRating={bookData.average_rating}
            ratingsCount={bookData.ratings_count}
            pageCount={bookData.page_count}
            publisher={bookData.publisher}
            publisherDate={bookData.publisher_date}
          />
          <div className="hidden md:flex flex-col gap-4">
            {bookData.description && (
              <BookDescription description={bookData.description} />
            )}
            {bookData.categories && (
              <BookCategories categories={bookData.categories} />
            )}
          </div>
          <div className="md:hidden flex flex-col">
            <ShelfOrganizer
              initialAssignedShelf={usersBookData?.shelf_name}
              bookshelves={bookshelves}
              user={user}
              bookData={bookData}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:hidden">
        <div className="flex flex-col gap-4">
          {bookData.description && (
            <BookDescription description={bookData.description} />
          )}
          {bookData.categories && (
            <BookCategories categories={bookData.categories} />
          )}
        </div>
      </div>
    </>
  );
}

BookPageContent.Skeleton = function BookPageContentSkeleton() {
  return (
    <>
      <div className="flex md:gap-8 gap-3 max-w-[900px] items-start">
        <div className="flex flex-col gap-2 flex-[1.1_1_0] md:flex-[0_0_auto]">
          <Skeleton className="max-w-[300px] md:h-[400px] h-[200px]" />
        </div>
        <div className="flex flex-col md:flex-1 flex-[2] gap-4">
          <BookInfo.Skeleton />
          <div className="hidden md:flex flex-col gap-4">
            <BookDescription.Skeleton />
            <BookCategories.Skeleton />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:hidden">
        <div className="flex flex-col gap-4">
          <BookDescription.Skeleton />
          <BookCategories.Skeleton />
        </div>
      </div>
    </>
  );
};
