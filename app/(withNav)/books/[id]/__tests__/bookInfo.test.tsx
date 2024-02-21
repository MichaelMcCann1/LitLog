import { render, screen } from "@testing-library/react";
import BookInfo from "../_components/bookInfo";

describe("BookInfo", () => {
  const props = {
    title: "title",
    authors: ["author 1"],
    averageRating: "5",
    ratingsCount: "10",
    pageCount: "200",
    publisher: "publisher",
    publisherDate: "2024-01-01",
  };

  it("renders the title", () => {
    render(<BookInfo {...props} />);

    expect(screen.getByText("title")).toBeInTheDocument();
  });

  it("renders the title as a link the book ID is given", () => {
    render(<BookInfo {...props} id="123" />);

    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  it("renders the authors", () => {
    render(<BookInfo {...props} />);

    expect(screen.getByText("author 1")).toBeInTheDocument();
  });

  it("renders the ratings and count", () => {
    render(<BookInfo {...props} />);

    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("10 ratings")).toBeInTheDocument();
  });

  it("does not render the ratings if they are not provided", () => {
    render(
      <BookInfo
        {...props}
        ratingsCount={undefined as any}
        averageRating={undefined as any}
      />
    );

    expect(screen.getByText("No ratings")).toBeInTheDocument();
  });

  it("renders the page count", () => {
    render(<BookInfo {...props} />);

    expect(screen.getByText("200 pages")).toBeInTheDocument();
  });

  it("does not render the pages if it is not provided", () => {
    render(<BookInfo {...props} pageCount={undefined as any} />);

    expect(screen.queryByText("200 pages")).toBeNull();
  });

  it("renders the publisher", () => {
    render(<BookInfo {...props} />);

    expect(screen.getByText("publisher")).toBeInTheDocument();
  });

  it("does not render the publisher if it is not provided", () => {
    render(<BookInfo {...props} publisher={undefined as any} />);

    expect(screen.queryByText("publisher")).toBeNull();
  });

  it("renders the publication date", () => {
    render(<BookInfo {...props} />);

    expect(
      screen.getByText("Jan 1, 2024")
    ).toBeInTheDocument();
  });

  it("does not render the publisher if it is not provided", () => {
    render(<BookInfo {...props} publisherDate={undefined as any} />);

    expect(screen.queryByText("Jan 1, 2024")).toBeNull();
  });
});
