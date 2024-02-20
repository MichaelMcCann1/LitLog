import { getUsersBooks } from "@/lib/actions/bookActions";
import React from "react";
import Bookshelf from "./bookshelf";
import { getUsersBookshelves } from "@/lib/actions/bookshelfActions";

interface Props {
  username: string | null | undefined;
}

export default async function BookshelvesPageContent({ username }: Props) {
  const [bookshelves, books] = await Promise.all([
    getUsersBookshelves(username),
    getUsersBooks(username),
  ]);

  const bookshelvesWithBookData = bookshelves?.map((shelf) => {
    return {
      ...shelf,
      bookData: books?.[shelf.shelf_name],
    };
  });

  return (
    <div className="flex flex-col gap-8 w-full items-center">
      {bookshelvesWithBookData &&
        bookshelvesWithBookData.map((shelf) => (
          <Bookshelf bookshelfData={shelf} key={shelf.shelf_id} />
        ))}
    </div>
  );
}

BookshelvesPageContent.Skeleton = function BookshelvesPageContentSkeleton() {
  return (
    <div className="flex flex-col gap-8 w-full items-center">
      <Bookshelf.Skeleton />
      <Bookshelf.Skeleton />
    </div>
  );
};
