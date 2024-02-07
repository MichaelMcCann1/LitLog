import { sql } from "@vercel/postgres";

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

export interface Bookshelf {
  shelf_id: string;
  username: string;
  email: string;
  shelf_name: string;
}

export interface Book {
  book_id: string;
  google_book_id: string;
  username: string;
  email: string;
  shelf_id: string;
  shelf_name: string;
  start_reading_date?: string;
  end_reading_date?: string;
}

const createUsersTable = async () => {
  try {
    await sql<User>`
    CREATE TABLE Users (
      user_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
  );
    `;
  } catch (error) {
    console.log(error);
  }
};

const createBookshelvesTable = async () => {
  try {
    await sql<Bookshelf>`
    CREATE TABLE Bookshelves (
      shelf_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      username VARCHAR(225) REFERENCES users(username) ON DELETE CASCADE,
      email VARCHAR(225) REFERENCES users(email) ON DELETE CASCADE,
      shelf_name VARCHAR(50) NOT NULL,
  );
    `;
  } catch (error) {
    console.log(error);
  }
};

const createBooksTable = async () => {
  try {
    await sql<Book>`
    CREATE TABLE Books (
      book_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      google_book_id VARCHAR(50) UNIQUE NOT NULL,
      username VARCHAR(225) REFERENCES users(username) ON DELETE CASCADE,
      email VARCHAR(225) REFERENCES users(email) ON DELETE CASCADE,
      shelf_id UUID REFERENCES bookshelves(shelf_id) ON DELETE CASCADE,
      shelf_name VARCHAR(50) NOT NULL,
      start_reading_date DATE,
      end_reading_date DATE,
  );
    `;
  } catch (error) {
    console.log(error);
  }
};
