import { render, screen } from "@testing-library/react"
import StarRating from "../starRating"


describe('starRating', () => {
  it('displays the average rating, ratings count, and star when provided', () => {
    render(<StarRating rating="3.5" ratingsCount="23"/>)

    expect(screen.getByText('3.5')).toBeInTheDocument()
    expect(screen.getByText('23 ratings')).toBeInTheDocument()
    expect(screen.getByTestId('star rating')).toBeInTheDocument()
  })

  it('displays "No Ratings" when no ratings are provided', () => {
    render(<StarRating rating={undefined} ratingsCount={undefined}/>)

    expect(screen.getByText('No ratings')).toBeInTheDocument();
    expect(screen.queryByTestId('star rating')).toBeNull()
  })
})