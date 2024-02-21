import { render, screen } from "@testing-library/react";
import BookInfoSection from "../_components/bookInfoSection";
import userEvent from "@testing-library/user-event";

describe("BookInfoSection", () => {
  const title = "Title";
  const content = "component content";

  it("displays the title", () => {
    render(<BookInfoSection title={title}>{content}</BookInfoSection>);

    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it("renders the children", () => {
    render(<BookInfoSection title={title}>{content}</BookInfoSection>);

    expect(screen.getByText(content)).toBeInTheDocument();
  });

  it("does not render the Show More/Less button if the expandable props is false", () => {
    render(<BookInfoSection title={title}>{content}</BookInfoSection>);

    expect(screen.queryByText("Show More")).toBeNull();
  });

  it("renders the Show More/Less button if the expandable props is true", () => {
    render(
      <BookInfoSection title={title} expandable>
        {content}
      </BookInfoSection>
    );

    expect(screen.getByText("Show More")).toBeInTheDocument();
  });

  it("changes the expand button text when the button is toggled", async () => {
    render(
      <BookInfoSection title={title} expandable>
        {content}
      </BookInfoSection>
    );

    const button = screen.getByRole("button");

    expect(button.textContent).toBe("Show More");

    await userEvent.click(button);

    expect(button.textContent).toBe("Show Less");
  });
});
