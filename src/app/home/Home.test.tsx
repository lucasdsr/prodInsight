import { render, screen, waitFor } from '@testing-library/react'
import { Home } from './page'
import { useFilterContext } from '@/providers/Providers'

jest.mock('@/providers/Providers', () => ({
  useFilterContext: jest.fn()
}))

describe('Home Component', () => {
  const mockFilters = { title: '', category: '', priceRange: '' }

  beforeEach(() => {
    ;(useFilterContext as jest.Mock).mockReturnValue({
      filters: mockFilters
    })
  })

  it('deve renderizar a lista de produtos corretamente', async () => {
    render(<Home />)

    expect(
      screen.getByRole('heading', { name: /ProdInsight/i })
    ).toBeInTheDocument()

    await waitFor(() =>
      expect(screen.getAllByTestId('product-card').length).toBeGreaterThan(0)
    )
  })

  it('deve filtrar produtos por título', async () => {
    ;(useFilterContext as jest.Mock).mockReturnValue({
      filters: { ...mockFilters, title: 'camisa' }
    })

    render(<Home />)

    await waitFor(() => {
      const filteredProducts = screen.getAllByTestId('product-card')
      expect(filteredProducts.length).toBeGreaterThan(0)
      filteredProducts.forEach((product: { textContent: any }) => {
        expect(product.textContent).toMatch(/camisa/i)
      })
    })
  })
})
