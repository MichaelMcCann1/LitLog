import { formatAuthors } from "../utils";

describe("formatAuthors", () => {
  it.each([
    {
      description: "returns an empty string if no authors are given",
      authors: undefined as any,
      result: "",
    },
    {
      description: "returns an empty string if an empty array is given",
      authors: [],
      result: "",
    },
    {
      description: "return the name of the author if there is only one author",
      authors: ["a"],
      result: "a",
    },
    {
      description: 'return two authors seperated by the word "and"',
      authors: ["a", "b"],
      result: "a and b",
    },
    {
      description: "return a comma seperated list when there are three authors",
      authors: ["a", "b", "c"],
      result: "a, b, and c",
    },
    {
      description:
        "return a comma seperated list when there are three or more authors",
      authors: ["a", "b", "c", "d", "e"],
      result: "a, b, c, d, and e",
    },
  ])("should $description", ({ authors, result }) => {
    expect(formatAuthors(authors)).toBe(result);
  });
});
