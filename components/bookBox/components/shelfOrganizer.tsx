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
import { Book, Bookshelf } from "@/lib/createTables";
import { ChevronDown } from "lucide-react";
import { User } from "next-auth";
import { useState, useTransition } from "react";

interface Props {
  bookData: Book;
  bookshelves: Omit<Bookshelf, "username" | "email">[] | undefined;
  user?: User;
  initialAssignedShelf: string | undefined;
}

export default function ShelfOrganizer({
  bookData,
  bookshelves,
  initialAssignedShelf,
  user,
}: Props) {
  const [assignedShelf, setAssignedShelf] = useState<string | undefined>(
    initialAssignedShelf
  );
  const [isPending, startTransition] = useTransition();
  const username = user?.name;
  const email = user?.email;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border p-2 bg-sky-600 text-white flex gap-4 items-center whitespace-nowrap">
        {assignedShelf || "Add to Bookshelf"}
        <ChevronDown size={18} className="ml-auto" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Add to Bookshelf</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {bookshelves
          ?.filter((shelf) => shelf.shelf_name !== assignedShelf)
          ?.map((shelf) => (
            <DropdownMenuItem
              className="cursor-pointer"
              key={shelf.shelf_id}
              disabled={!username || isPending}
              onClick={() => {
                if (!username || !email) return;
                setAssignedShelf(shelf.shelf_name);

                startTransition(() => {
                  addBookToShelf({
                    google_book_id: bookData.google_book_id,
                    username,
                    email,
                    shelf_id: shelf.shelf_id,
                    shelf_name: shelf.shelf_name,
                    title: bookData.title,
                    cover: bookData.cover,
                    authors: bookData.authors,
                    page_count: bookData.page_count,
                    average_rating: bookData.average_rating,
                    ratings_count: bookData.ratings_count,
                    publisher: bookData.publisher,
                    publisher_date: bookData.publisher_date,
                    description: bookData.description,
                    categories: bookData.categories,
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
                removeFromShelf(bookData.google_book_id, username);
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
