import { render, screen } from "@testing-library/react";
import NoUserAlert from "../NoUserAlert";

describe("NoUserAlert", () => {
  it("renders the message", () => {
    const message = "test message";
    render(<NoUserAlert message={message} />);

    const renderedText = screen.getByText(message);
    expect(renderedText).toBeInTheDocument();
  });
});
