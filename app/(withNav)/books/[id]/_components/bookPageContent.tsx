import ShelfOrganizer from "@/components/bookBox/components/shelfOrganizer";
import { getUsersBookData } from "@/lib/actions/bookActions";
import { getGoogleBookData } from "@/lib/googleBooksAPI";
import React from "react";
import BookInfo from "./bookInfo";
import BookDescription from "./bookDescription";
import BookCategories from "./bookCategories";
import { User } from "next-auth";
import { Skeleton } from "@/components/ui/skeleton";
import { getUsersBookshelves } from "@/lib/actions/bookshelfActions";

interface Props {
  user: User | undefined;
  bookId: string;
}

export default async function BookPageContent({ user, bookId }: Props) {
  const [bookData, bookshelves] = await Promise.all([
    getGoogleBookData(bookId),
    getUsersBookshelves(user?.name || process.env.DEMO_ACCOUNT_USERNAME),
  ]);
  const usersBookData = await getUsersBookData(
    user?.name || process.env.DEMO_ACCOUNT_USERNAME,
    bookData.google_book_id
  );

  console.log(bookData.cover)

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
              user={
                user || {
                  name: process.env.DEMO_ACCOUNT_USERNAME,
                  email: process.env.DEMO_ACCOUNT_EMAIL,
                }
              }
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
              user={
                user || {
                  name: process.env.DEMO_ACCOUNT_USERNAME,
                  email: process.env.DEMO_ACCOUNT_EMAIL,
                }
              }
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
      <div className="flex md:gap-8 gap-3 max-w-[900px] items-start w-full">
        <Skeleton className="flex-[1.1_1_0] max-w-[300px] md:h-[400px] h-[200px]" />
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
