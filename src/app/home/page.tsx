'use client'

import { Grid2 } from '@mui/material'

import { ProductCard } from '@/components/ProductCard'
import { PageContainer } from '@toolpad/core/PageContainer'
import { ProductsFilters } from '@/components/ProductsFilters'

import { useCallback, useEffect, useState } from 'react'
import { useFilterContext } from '@/providers/Providers'
import { Product } from '../interfaces'

export function Home() {
  const { filters } = useFilterContext()
  const [products, setProducts] = useState<Product[]>([])

  const filterDataByTitle = useCallback(
    (data: Product[]): Product[] => {
      if (!filters.title) return data

      return data.filter(({ title }) => title.includes(filters.title || ''))
    },
    [filters]
  )

  const filterDataByPriceRange = useCallback(
    (data: Product[]): Product[] => {
      if (!filters.priceRange && filters.priceRange == null) return data

      let filteredData = data

      switch (filters.priceRange) {
        case '500':
          filteredData = data.filter(({ price }) => Number(price) < 500)
          break
        case '1000':
          filteredData = data.filter(
            ({ price }) => Number(price) > 500 && Number(price) < 1000
          )
          break
        default:
          filteredData = data.filter(({ price }) => Number(price) > 1000)
          break
      }

      return filteredData
    },
    [filters]
  )

  useEffect(() => {
    let fakeAPI = 'https://fakestoreapi.com/products'

    if (filters.category) fakeAPI = `${fakeAPI}/category/${filters.category}`

    const fetchProducts = async () => {
      try {
        const res = await fetch(fakeAPI)
        let data = (await res.json()) as Product[]

        if (filters.priceRange) data = filterDataByPriceRange(data)
        if (filters.title) data = filterDataByTitle(data)

        setProducts(data)
      } catch (error) {
        console.error('Erro ao buscar a lista de produtos:', error)
      }
    }

    fetchProducts()
  }, [filters])

  return (
    <PageContainer title='ProdInsight'>
      <ProductsFilters />
      <Grid2 container spacing={4}>
        {products.map(({ id, image, title, price, category }) => (
          <ProductCard
            id={id}
            key={id}
            image={image}
            title={title}
            price={price}
            category={category}
          />
        ))}
      </Grid2>
    </PageContainer>
  )
}
