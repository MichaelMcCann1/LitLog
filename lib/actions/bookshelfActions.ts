"use server";

import { sql } from "@vercel/postgres";
import { Bookshelf } from "../createTables";
import { revalidatePath } from "next/cache";

export const addDefaultBookshelves = async (
  username: string,
  email: string
) => {
  try {
    await sql<Bookshelf>`
      INSERT INTO bookshelves (username, email, shelf_name)
      VALUES 
        (${username}, ${email}, 'Read'),
        (${username}, ${email}, 'Reading'),
        (${username}, ${email}, 'Did Not Finish'),
        (${username}, ${email}, 'To Be Read')
    `;
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/bookshelves");
};

export const getUsersBookshelves = async (
  username: string | undefined | null
) => {
  if (!username) return;

  const { rows } = await sql<Omit<Bookshelf, "username" | "email">>`
    SELECT
      shelf_id,
      shelf_name,
      (
        SELECT COUNT(*)
        FROM books
        WHERE books.shelf_id = bookshelves.shelf_id
          AND books.username = bookshelves.username
      ) AS book_count
    FROM
      bookshelves
    WHERE
      bookshelves.username = ${username};
  `;

  return rows;
};

export const getBookShelfName = async (
  username: string | undefined | null,
  shelf_id: string
) => {
  if (!username) return;

  const { rows } = await sql<Pick<Bookshelf, "shelf_name">>`
    SELECT shelf_name FROM bookshelves
    WHERE username = ${username} AND shelf_id = ${shelf_id}
  `;

  return rows[0];
};