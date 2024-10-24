import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { notFound } from 'next/navigation'
import ProductPage from './page'
import { Product } from '@/app/interfaces'

// Mock do módulo de navegação para evitar navegação real durante os testes
jest.mock('next/navigation', () => ({
  notFound: jest.fn()
}))

// Mock para o método fetch
global.fetch = jest.fn()

describe('ProductPage', () => {
  const mockProduct: Product = {
    id: 1,
    title: 'Produto de Teste',
    price: 100.0,
    category: 'Categoria de Teste',
    description: 'Descrição do produto de teste',
    image: 'https://fakestoreapi.com/img/sample.jpg'
  }

  beforeEach(() => {
    ;(fetch as jest.Mock).mockClear()
    ;(notFound as unknown as jest.Mock).mockClear()
  })

  it('deve renderizar o produto corretamente quando encontrado', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockProduct
    })

    render(<ProductPage params={{ id: '1' }} />)

    // Aguarda até que o título do produto seja encontrado na tela
    await waitFor(() => {
      expect(screen.getByText(mockProduct.title)).toBeInTheDocument()
    })

    expect(screen.getByText('Voltar')).toBeInTheDocument()
    expect(screen.getByText('R$ 100,00')).toBeInTheDocument()
    expect(screen.getByText(mockProduct.category)).toBeInTheDocument()
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument()
    expect(screen.getByAltText(mockProduct.title)).toHaveAttribute(
      'src',
      mockProduct.image
    )
  })

  it('deve chamar notFound quando o produto não for encontrado', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => null
    })

    render(<ProductPage params={{ id: '999' }} />)

    // Verifica se a função notFound foi chamada
    await waitFor(() => {
      expect(notFound).toHaveBeenCalled()
    })
  })
})
