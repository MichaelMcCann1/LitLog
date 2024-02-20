"use server";
import { sql } from "@vercel/postgres";
import { Book } from "../createTables";
import { getGoogleBooksList } from "../googleBooksAPI";
import { groupBy } from "lodash";
import { revalidatePath } from "next/cache";

export const getUsersBooks = async (username: string | undefined | null) => {
  if (!username) return;

  const { rows } = await sql<
    Pick<Book, "google_book_id" | "shelf_name" | "title" | "cover">
  >`
    WITH RankedBooks AS (
      SELECT
        google_book_id,
        shelf_name,
        title,
        cover,
        ROW_NUMBER() OVER (PARTITION BY shelf_name ORDER BY google_book_id) AS row_num
      FROM books
      WHERE username = ${username}
    )
    SELECT
      google_book_id,
      shelf_name,
      title,
      cover
    FROM RankedBooks
    WHERE row_num <= 5;
  `;

  return groupBy(rows, "shelf_name");
};

export const addBookToShelf = async (data: Omit<Book, "book_id">) => {
  const {
    google_book_id,
    username,
    email,
    shelf_id,
    shelf_name,
    title,
    cover,
    authors,
    page_count,
    average_rating,
    ratings_count,
    publisher,
    publisher_date,
    description,
    categories,
  } = data;

  try {
    const stringifiedAuthors = JSON.stringify(authors)
      .replace("[", "{")
      .replace("]", "}");
    const stringifiedCategories = JSON.stringify(categories)
      .replace("[", "{")
      .replace("]", "}");
    await sql<Book>`
      INSERT INTO books (google_book_id, username, email, shelf_id, shelf_name, title, cover, authors, page_count, average_rating, ratings_count, publisher, publisher_date, description, categories)
      VALUES (${google_book_id}, ${username}, ${email}, ${shelf_id}, ${shelf_name}, ${title}, ${cover}, ${stringifiedAuthors}, ${page_count}, ${average_rating}, ${ratings_count}, ${publisher}, ${publisher_date}, ${description}, ${stringifiedCategories})
      ON CONFLICT (username, google_book_id)
      DO UPDATE SET
        shelf_id = ${shelf_id},
        shelf_name = ${shelf_name};
    `;
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/bookshelves");
};

export const removeFromShelf = async (
  google_book_id: string,
  username: string
) => {
  try {
    await sql`
      DELETE FROM books
      WHERE google_book_id = ${google_book_id} AND username = ${username}
    `;
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/bookshelves");
};

export const getBooksList = async (
  username: string | null | undefined,
  search: string
) => {
  const googleBookListData = await getGoogleBooksList(search);

  if (!googleBookListData.length) {
    return [];
  }

  const googleBookIdArray = googleBookListData.map(
    (book) => book.google_book_id
  );
  const vars = googleBookIdArray.map((_, index) => `$${index + 2}`).join(", ");
  const query = `
  SELECT google_book_id, shelf_id, shelf_name, start_reading_date, end_reading_date
  FROM books
  WHERE username = $1 AND google_book_id IN (${vars});
  `;
  const queryParams = [username, ...googleBookIdArray];

  const client = await sql.connect();
  const { rows } = await client.query<Book>(query, queryParams);
  client.release();

  const groupedRows = groupBy(rows, "google_book_id");

  return googleBookListData.map((book) => {
    const assignedBook = groupedRows?.[book.google_book_id]?.[0];

    return {
      ...book,
      shelf_id: assignedBook?.shelf_id,
      shelf_name: assignedBook?.shelf_name,
      start_reading_date: assignedBook?.start_reading_date,
      end_reading_date: assignedBook?.end_reading_date,
    } as Book;
  });
};

export const getUsersBookData = async (
  username: string | undefined | null,
  google_book_id: string
) => {
  if (!username) return;

  const { rows } = await sql<Pick<Book, "shelf_name">>`
    SELECT shelf_name FROM books
    WHERE username = ${username} AND google_book_id = ${google_book_id}
  `;

  return rows[0];
};

export const getBooksFromShelf = async (
  username: string | undefined | null,
  shelf_id: string
) => {
  if (!username) return;

  const { rows } = await sql<Book>`
    SELECT * FROM books
    WHERE username = ${username} AND shelf_id = ${shelf_id}
  `;

  return rows;
};
