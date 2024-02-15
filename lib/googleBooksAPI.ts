const ApiPath = "https://www.googleapis.com/books/v1/volumes";

export interface BookData {
  id: string;
  title: string;
  authors: string[];
  description: string;
  publisher: string;
  publisherDate: string;
  pageCount: string;
  categories: string[];
  averageRating: string;
  ratingsCount: string;
  cover: string;
  shelfId: string | undefined;
  shelfName: string | undefined;
  startReadingDate: string | undefined;
  endReadingDate: string | undefined; 
}

export const getGoogleBooksList = async (search: string) => {
  if (!search) return [];

  const booksListResponse = await fetch(`${ApiPath}?q=${search}`, {cache: 'force-cache'});
  const data = await booksListResponse.json();

  if (!data?.items) {
    return []
  }

  const booksList = data.items as any[];
  return booksList?.map((book) => {
    return {
      id: book?.id,
      title: book?.volumeInfo?.title,
      authors: book?.volumeInfo?.authors,
      publisher: book?.volumeInfo?.publisher,
      publisherDate: book?.volumeInfo?.publishedDate,
      pageCount: book?.volumeInfo?.pageCount,
      categories: book?.volumeInfo?.categories,
      averageRating: book?.volumeInfo?.averageRating,
      ratingsCount: book?.volumeInfo?.ratingsCount,
      cover: book?.volumeInfo?.imageLinks?.thumbnail,
      shelfId: undefined,
      shelfName: undefined,
      startReadingDate: undefined,
      endReadingDate: undefined,
    } as BookData;
  });
};

export const getBook = async (id: string) => {
  const bookResponse = await fetch(`${ApiPath}/${id}`);
  const book = await bookResponse.json();

  return {
    id: book?.id,
    title: book?.volumeInfo?.title,
    authors: book?.volumeInfo?.authors,
    description: book?.volumeInfo?.description,
    publisher: book?.volumeInfo?.publisher,
    publisherDate: book?.volumeInfo?.publishedDate,
    pageCount: book?.volumeInfo?.pageCount,
    categories: book?.volumeInfo?.categories,
    averageRating: book?.volumeInfo?.averageRating,
    ratingsCount: book?.volumeInfo?.ratingsCount,
    cover: book?.volumeInfo?.imageLinks?.small,
    shelfId: undefined,
    shelfName: undefined,
    startReadingDate: undefined,
    endReadingDate: undefined,
  } as BookData;
};
