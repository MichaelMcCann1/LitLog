import { sql } from "@vercel/postgres";
import { Book } from "../createTables";
import { getPublicationYear } from "../utils";
import { countBy } from "lodash";

export interface BookDistribution {
  page_count_bucket: string;
  book_count: string;
  percentage: number;
}

export const getUsersCompletedBooksCount = async (
  username: string | null | undefined
) => {
  if (!username) {
    return;
  }

  interface CountResult {
    count: number;
  }

  const { rows } = await sql<CountResult>`
    SELECT COUNT(book_id)
    FROM books
    WHERE username = ${username} AND shelf_name = 'Read'
  `;

  return rows[0].count;
};

export const getUsersTotalPageCount = async (
  username: string | null | undefined
) => {
  if (!username) {
    return;
  }

  interface PageCountResult {
    pages: number;
  }

  const { rows } = await sql<PageCountResult>`
    SELECT SUM(CAST(page_count AS INTEGER)) as pages
    FROM books
    WHERE username = ${username} AND shelf_name = 'Read'
  `;

  return rows[0].pages;
};

export const getPageCountDistribution = async (
  username: string | null | undefined
) => {
  if (!username) {
    return;
  }

  const { rows } = await sql<BookDistribution>`
  SELECT
    page_count_bucket,
    COUNT(*) AS book_count,
    COUNT(*) * 100.0 / SUM(COUNT(*)) OVER () AS percentage
  FROM (
    SELECT
      CASE
          WHEN CAST(page_count AS INTEGER) < 100 THEN '< 100 Pages'
          WHEN CAST(page_count AS INTEGER) BETWEEN 100 AND 299 THEN '100-299 Pages'
          WHEN CAST(page_count AS INTEGER) BETWEEN 300 AND 499 THEN '300-499 Pages'
          ELSE '500+ Pages'
      END AS page_count_bucket
    FROM books
    WHERE username = ${username}
  ) as subquery
  GROUP BY page_count_bucket
  `;

  return rows;
};

export const getPublicationDateDistribution = async (
  username: string | null | undefined
) => {
  if (!username) {
    return;
  }

  const { rows } = await sql<Pick<Book, "publisher_date">>`
    SELECT publisher_date
    FROM books
    WHERE username = ${username}
  `;

  const yearsList = rows.map((row) => getPublicationYear(row.publisher_date));
  const filteredYearsList = yearsList.filter((year) => year) as number[];
  return countBy(filteredYearsList);
};

export const getAuthorsDistribution = async (
  username: string | null | undefined
) => {
  if (!username) {
    return;
  }

  const { rows } = await sql<Pick<Book, "authors">>`
    SELECT authors
    FROM books
    WHERE username = ${username}
  `;

  const authorsList = rows.flatMap((row) => row.authors);

  return countBy(authorsList);
};
