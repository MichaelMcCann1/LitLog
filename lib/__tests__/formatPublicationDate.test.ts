import { formatPublicationDate } from "../utils";

describe("formatPublicationDate", () => {
  it("formats the full date correctly", () => {
    expect(formatPublicationDate("2022-03-12")).toBe("Mar 12, 2022");
  });

  it("formats the medium length date correctly", () => {
    expect(formatPublicationDate("2022-03")).toBe("Mar 2022");
  });

  it("displays the year if that is the only info given", () => {
    expect(formatPublicationDate("2022")).toBe("2022");
  });

  it("returns the unformatted date if it does not match any format", () => {
    expect(formatPublicationDate("hello world")).toBe("hello world");
  });
});
