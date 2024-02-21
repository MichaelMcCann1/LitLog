import { render, screen } from "@testing-library/react";
import BookDescription from "../_components/bookDescription";

describe("BookDescription", () => {
  it("renders the description", () => {
    render(<BookDescription description="<p>Book Description</p>" />);

    expect(screen.getByText("Book Description")).toBeInTheDocument();
  });
});
