import { auth } from "@/auth";
import { getBookshelves } from "@/lib/actions";
import React from "react";

export default async function page() {
  const session = await auth();
  const bookshelves = await getBookshelves(session?.user?.name);

  return (
    <div className="flex flex-col gap-20 items-center">
      <h1 className="text-3xl pt-10">My BookShelves</h1>

      {bookshelves &&
        bookshelves.map((shelf) => (
          <p key={shelf.shelf_id}>{shelf.shelf_name}</p>
        ))}
    </div>
  );
}
