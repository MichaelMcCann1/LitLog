import { auth } from "@/auth";
import { getUsersBooks, getUsersBookshelves } from "@/lib/actions";
import React from "react";
import Bookshelf from "./_components/bookshelf";

export default async function page() {
  const session = await auth();
  const bookshelves = await getUsersBookshelves(session?.user?.name);
  const books = await getUsersBooks(session?.user?.name);

  const bookshelvesWithBookData = bookshelves?.map((shelf) => {
    return {
      ...shelf,
      bookData: books?.[shelf.shelf_name],
    };
  });

  return (
    <div className="flex flex-col gap-20 items-center py-10 px-4">
      <h1 className="text-3xl">My Bookshelves</h1>
      <div className="flex flex-col gap-8 w-full items-center">
        {bookshelvesWithBookData &&
          bookshelvesWithBookData.map((shelf) => (
            <Bookshelf bookshelfData={shelf} key={shelf.shelf_id} />
          ))}
      </div>
    </div>
  );
}
