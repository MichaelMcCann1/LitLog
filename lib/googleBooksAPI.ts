import { Book } from "./createTables";
const ApiPath = "https://www.googleapis.com/books/v1/volumes";

type GoogleBookData = Pick<
  Book,
  | "google_book_id"
  | "title"
  | "authors"
  | "publisher"
  | "publisher_date"
  | "page_count"
  | "categories"
  | "average_rating"
  | "ratings_count"
  | "cover"
  | "description"
>;

export const getGoogleBooksList = async (search: string) => {
  if (!search) return [];

  const booksListResponse = await fetch(`${ApiPath}?q=${search}&maxResults=20`, {
    cache: "force-cache",
  });
  const data = await booksListResponse.json();

  if (!data?.items) {
    return [];
  }

  const booksList = data.items as any[];
  return booksList?.map((book) => {
    return {
      google_book_id: book?.id,
      title: book?.volumeInfo?.title,
      authors: book?.volumeInfo?.authors,
      publisher: book?.volumeInfo?.publisher,
      publisher_date: book?.volumeInfo?.publishedDate,
      page_count: book?.volumeInfo?.pageCount,
      categories: book?.volumeInfo?.categories,
      average_rating: book?.volumeInfo?.averageRating,
      ratings_count: book?.volumeInfo?.ratingsCount,
      cover: book?.volumeInfo?.imageLinks?.thumbnail,
    } as GoogleBookData;
  });
};

export const getGoogleBookData = async (id: string) => {
  const bookResponse = await fetch(`${ApiPath}/${id}`);
  const book = await bookResponse.json();

  return {
    google_book_id: book?.id,
    title: book?.volumeInfo?.title,
    authors: book?.volumeInfo?.authors,
    description: book?.volumeInfo?.description,
    publisher: book?.volumeInfo?.publisher,
    publisher_date: book?.volumeInfo?.publishedDate,
    page_count: book?.volumeInfo?.pageCount,
    categories: book?.volumeInfo?.categories,
    average_rating: book?.volumeInfo?.averageRating,
    ratings_count: book?.volumeInfo?.ratingsCount,
    cover: book?.volumeInfo?.imageLinks?.small,
  } as Book;
};
