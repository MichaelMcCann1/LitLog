import { render, screen } from "@testing-library/react"
import BookCategories from "../_components/bookCategories"

describe('BookCategories', () => {
  const categories = ['cat 1', 'cat 2', 'cat 3']

  it('renders the categories', () => {
    render(<BookCategories categories={categories}/>)

    expect(screen.getAllByRole('listitem').length).toBe(3)
  })
})