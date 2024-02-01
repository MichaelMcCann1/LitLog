import { getBook } from "@/lib/googleBooksAPI";
import Image from "next/image";
import React from "react";

export default async function page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const bookData = await getBook(params.id);

  return (
    <div className="flex gap-4 justify-center">
      <Image
        src={bookData.cover}
        alt={bookData.title}
        width={300}
        height={450}
      />
      <div className="flex flex-col">
        <p>{bookData.title}</p>
        <p>{bookData.authors}</p>
      </div>
    </div>
  );
}
