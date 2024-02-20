import StarRating from "@/components/starRating/starRating";
import { Skeleton } from "@/components/ui/skeleton";
import { formatAuthors, formatPublicationDate } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  authors: string[];
  averageRating: string;
  ratingsCount: string;
  pageCount: string;
  publisher: string;
  publisherDate: string;
  id?: string;
}

export default function BookInfo({
  title,
  authors,
  averageRating,
  ratingsCount,
  pageCount,
  publisher,
  publisherDate,
  id,
}: Props) {
  return (
    <div className="flex flex-col">
      {id ? (
        <Link href={`/books/${id}`} className="text-xl md:text-2xl font-medium">
          {title}
        </Link>
      ) : (
        <p className="text-xl md:text-2xl font-medium">{title}</p>
      )}
      <p className="md:text-xl py-2">{formatAuthors(authors)}</p>
      <div className="pb-2">
        <StarRating rating={averageRating} ratingsCount={ratingsCount} />
      </div>
      <div className="flex flex-col font-light pb-4 text-sm">
        {!!pageCount && <p>{pageCount} pages</p>}
        {publisher && (
          <p className="hidden md:block">
            <span className="font-normal">Publisher:</span> {publisher}
          </p>
        )}
        {publisherDate && (
          <p className="hidden md:block">
            <span className="font-normal">Publication Date:</span>{" "}
            {formatPublicationDate(publisherDate)}
          </p>
        )}
      </div>
    </div>
  );
}

BookInfo.Skeleton = function BookInfoSkeleton() {
  return (
    <div className="flex flex-col gap-1">
      <Skeleton className="h-7 max-w-[400px]" />
      <Skeleton className="h-6 py-2 w-[200px]" />
      <Skeleton className="h-4 w-[100px]" />
      <div className="flex flex-col pt-2 gap-1">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
    </div>
  );
};
