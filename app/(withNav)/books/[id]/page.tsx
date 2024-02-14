import { getBook } from "@/lib/googleBooksAPI";
import Image from "next/image";
import React from "react";
import BookDescription from "./_components/bookDescription";
import { formatAuthors, formatPublicationDate } from "@/lib/utils";
import BookCategories from "./_components/bookCategories";
import StarRating from "@/components/starRating/starRating";

export default async function page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const bookData = await getBook(params.id);

  return (
    <div className="py-10 px-2 flex justify-center">
      <div className="flex gap-8 max-w-[900px] items-start">
        <Image
          src={bookData.cover}
          alt={bookData.title}
          width={300}
          height={450}
          className="flex-shrink-0 shadow-lg"
        />
        <div className="flex flex-col">
          <p className="text-3xl font-medium">{bookData.title}</p>
          <p className="text-xl py-2">{formatAuthors(bookData.authors)}</p>
          <div className="pb-2">
            <StarRating
              rating={bookData.averageRating}
              ratingsCount={bookData.ratingsCount}
            />
          </div>
          <div className="flex flex-col font-light pb-4 text-sm">
            <p>{bookData.pageCount} pages</p>
            <p>
              <span className="font-normal">Publisher:</span>{" "}
              {bookData.publisher}
            </p>
            <p>
              <span className="font-normal">Publication Date:</span>{" "}
              {formatPublicationDate(bookData.publisherDate)}
            </p>
          </div>
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
