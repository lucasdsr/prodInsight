'use client'

import {
  ReactElement,
  useEffect,
  useMemo,
  useState,
  useCallback,
  FormEvent
} from 'react'

import { Context, useFilterContext } from '@/providers/Providers'
import { IFilters } from '@/providers/interfaces'

import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material'

import { Categorie } from '@/app/interfaces'

export const ProductsFilters = (): ReactElement => {
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<Categorie[]>([])

  const [formState, setFormState] = useState<IFilters>({})

  const priceRangeOptions = useMemo(
    () => [
      {
        title: 'Até R$500,00',
        maxRange: 500
      },
      {
        title: 'Entre R$500,00 e R$1000,00',
        maxRange: 1000
      },
      {
        title: 'Acima de R$1000,00',
        maxRange: '-1'
      }
    ],
    []
  )

  const { filterData } = useFilterContext()

  const { title = '', category = '', priceRange = 0 } = formState

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products/categories')
        const categoriesRes = (await res.json()) as Categorie[]

        setCategories(categoriesRes)
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
      } finally {
        setLoading(false)
      }
    }

    getCategories()
  }, [])

  const updateValue = useCallback(
    (fieldName: string, fieldValue: string | number) =>
      setFormState(currState => ({ ...currState, [fieldName]: fieldValue })),
    []
  )

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    filterData(formState)
  }

  if (loading) {
    return <div>Carregando...</div>
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ marginY: '24px', display: 'flex', gap: '24px' }}>
        <FormControl>
          <TextField
            value={title}
            variant='outlined'
            label='Nome do produto'
            onChange={e => updateValue('title', e.target.value)}
          />
        </FormControl>

        <FormControl sx={{ width: '200px' }}>
          <InputLabel id='demo-simple-select-label'>Categoria</InputLabel>
          <Select
            value={category}
            label='Categoria'
            onChange={e => updateValue('category', e.target.value)}
          >
            <MenuItem value={''}>Todas</MenuItem>
            {categories.map(category => (
              <MenuItem key={category as unknown as string} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ width: '300px' }}>
          <InputLabel id='demo-simple-select-label'>Faixa de preço</InputLabel>
          <Select
            value={priceRange}
            label='Faixa de preço'
            onChange={e => updateValue('priceRange', e.target.value)}
          >
            <MenuItem value={''}>Todas</MenuItem>
            {priceRangeOptions.map(price => (
              <MenuItem
                key={price.title as string}
                value={price.maxRange?.toString()}
              >
                {price.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant='contained' type='submit'>
          Filtrar
        </Button>
      </Box>
    </form>
  )
}
