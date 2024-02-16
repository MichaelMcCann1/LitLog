"use server";

import { registrationFormSchema } from "@/app/(withoutNav)/register/_components/registrationForm";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";
import { loginFormSchema } from "@/app/(withoutNav)/login/_components/loginForm";
import { signIn, signOut } from "@/auth";
import { Book, Bookshelf, User } from "./createTables";
import { getGoogleBooksList } from "./googleBooksAPI";
import { groupBy } from "lodash";
import { revalidatePath } from "next/cache";

export const createUser = async (
  userData: z.infer<typeof registrationFormSchema>
) => {
  const { username, email, password } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);

  const { rows } = await sql<User>`
    SELECT email, username
    FROM users 
    WHERE email = ${email} OR username = ${username}`;

  if (rows.length) {
    if (rows[0].email === email) {
      return "Error! The email entered is already in use.";
    }
    return "Error! The username entered is already in use.";
  }

  try {
    await sql<User>`INSERT INTO users (username, email, password)
    VALUES (${username}, ${email}, ${hashedPassword})
    `;
  } catch (error) {
    console.log(error);
  }

  await addDefaultBookshelves(username, email);
  await logInUser({ email, password });

  revalidatePath("/bookshelves");
};

export const logInUser = async (userData: z.infer<typeof loginFormSchema>) => {
  const { email, password } = userData;

  const { rows } = await sql<User>`
  SELECT * FROM users WHERE email=${email}
  `;

  if (!rows.length) {
    return "Error! Invalid credentials";
  }

  const entry = rows[0];
  const passwordsMatch = await bcrypt.compare(password, entry.password);

  if (!passwordsMatch) {
    return "Error! Invalid credentials";
  }

  await signIn("credentials", { ...entry, redirectTo: "/" });
};

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

export const logoutButtonCallback = async () => {
  await signOut();
};

interface BookshelfName {
  shelf_name: string;
}

export const getBookShelfName = async (
  username: string | undefined | null,
  shelf_id: string
) => {
  if (!username) return;

  const { rows } = await sql<BookshelfName>`
    SELECT shelf_name FROM bookshelves
    WHERE username = ${username} AND shelf_id = ${shelf_id}
  `;

  return rows[0];
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
