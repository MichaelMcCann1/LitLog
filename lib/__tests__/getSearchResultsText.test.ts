import { getSearchResultsText } from "../utils";

describe("getSearchResultsText", () => {
  it('returns "Search All Books" if there is no query text', () => {
    expect(getSearchResultsText(undefined, 0)).toBe("Search All Books");
    expect(getSearchResultsText(undefined, 5)).toBe("Search All Books");
  });

  it('returns "Search results for ___" if a query is provided and there are results', () => {
    expect(getSearchResultsText("test", 5)).toBe("Search results for test");
  });

  it('returns "No results for ___" if a query is provided and there are no results', () => {
    expect(getSearchResultsText("test", 0)).toBe("No results for test");
  });
});
