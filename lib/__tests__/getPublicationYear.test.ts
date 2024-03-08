import { getPublicationYear } from "../utils"


describe('getPublicationYear', () => {
  it('handles the full date', () => {
    expect(getPublicationYear('2022-03-12')).toBe(2022)
  })

  it('handles the medium length date', () => {
    expect(getPublicationYear('2021-03')).toBe(2021)
  })

  it('returns the year if only the year is provided', () => {
    expect(getPublicationYear('2020')).toBe(2020)
  })

  it('returns undefined if no date is passed or invalid date is passed', () => {
    expect(getPublicationYear(undefined as any)).toBe(undefined)
    expect(getPublicationYear('nonsense')).toBe(undefined)
  })
})