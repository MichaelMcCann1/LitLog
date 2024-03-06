import { sql } from "@vercel/postgres";

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

  interface BookDistribution {
    page_count_bucket: string;
    page_count: string;
  }

  const { rows } = await sql<BookDistribution>`
  SELECT
    page_count_bucket,
    COUNT(*) AS book_count,
    COUNT(*) * 100.0 / SUM(COUNT(*)) OVER () AS percentage
  FROM (
    SELECT
      CASE
          WHEN CAST(page_count AS INTEGER) < 100 THEN '<100'
          WHEN CAST(page_count AS INTEGER) BETWEEN 100 AND 299 THEN '100-299'
          WHEN CAST(page_count AS INTEGER) BETWEEN 300 AND 499 THEN '300-499'
          ELSE '500+ pages'
      END AS page_count_bucket
    FROM books
    WHERE username = ${username}
  ) as subquery
  GROUP BY page_count_bucket
  `;

  return rows;
};
