const ApiPath = "https://www.googleapis.com/books/v1/volumes";

export const getBooksList = async (search: string) => {
  if (!search) return []

  const booksListResponse = await fetch(`${ApiPath}?q=${search}`);
  console.log(booksListResponse)
  const data = await booksListResponse.json();

  const booksList = data?.items as any[];
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
    };
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
  };
};
