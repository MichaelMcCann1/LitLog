"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { addBookToShelf, removeFromShelf } from "@/lib/actions";
import { Bookshelf } from "@/lib/createTables";
import { User } from "next-auth";
import { useState, useTransition } from "react";

interface Props {
  bookshelves: Omit<Bookshelf, "username" | "email">[] | undefined;
  book_id: string;
  user?: User;
  initialAssignedShelf: string | undefined;
  title: string;
  cover: string;
}

export default function ShelfOrganizer({
  bookshelves,
  book_id,
  user,
  initialAssignedShelf,
  title,
  cover,
}: Props) {
  const [assignedShelf, setAssignedShelf] = useState<string | undefined>(
    initialAssignedShelf
  );
  const [isPending, startTransition] = useTransition();
  const username = user?.name;
  const email = user?.email;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border p-2">
        {assignedShelf || "Add to Bookshelf"}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Add to Bookshelf</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {bookshelves?.map((shelf) => (
          <DropdownMenuItem
            key={shelf.shelf_id}
            disabled={!username || isPending}
            onClick={() => {
              if (!username || !email) return;
              setAssignedShelf(shelf.shelf_name);

              startTransition(() => {
                addBookToShelf({
                  google_book_id: book_id,
                  username,
                  email,
                  shelf_id: shelf.shelf_id,
                  shelf_name: shelf.shelf_name,
                  title,
                  cover,
                });
              });
            }}
          >
            {shelf.shelf_name}
          </DropdownMenuItem>
        ))}
        {assignedShelf && (
          <DropdownMenuItem
            disabled={!username || isPending}
            onClick={() => {
              if (!username) return;
              setAssignedShelf(undefined);

              startTransition(() => {
                removeFromShelf(book_id, username);
              });
            }}
          >
            Remove from shelf
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
