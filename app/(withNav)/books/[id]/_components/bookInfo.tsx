import StarRating from "@/components/starRating/starRating";
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
        <Link href={`/books/${id}`} className="text-2xl font-medium">
          {title}
        </Link>
      ) : (
        <p className="text-xl md:text-3xl font-medium">{title}</p>
      )}
      <p className="md:text-xl py-2">{formatAuthors(authors)}</p>
      <div className="pb-2">
        <StarRating rating={averageRating} ratingsCount={ratingsCount} />
      </div>
      <div className="flex flex-col font-light pb-4 text-sm">
        <p>{pageCount} pages</p>
        <p>
          <span className="font-normal">Publisher:</span> {publisher}
        </p>
        <p>
          <span className="font-normal">Publication Date:</span>{" "}
          {formatPublicationDate(publisherDate)}
        </p>
      </div>
    </div>
  );
}
