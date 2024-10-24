'use client'

import {
  createContext,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useState
} from 'react'

import { ThemeProvider } from 'styled-components'

import { theme } from '../assets/style'
import { IContext, IFilters } from './interfaces'

export const Context = createContext<IContext>({
  filters: {},
  filterData: () => {},
  updateFilters: () => {}
})

export const Providers = ({
  children
}: {
  children: ReactNode
}): PropsWithChildren<ReactElement> => {
  const [filters, setFilters] = useState<IFilters>({
    title: '',
    category: '',
    priceRange: ''
  })

  const updateFilters = useCallback(
    (updatedFilters: Partial<IFilters> | IFilters) =>
      setFilters(currFilters => ({ ...currFilters, ...updatedFilters })),
    [setFilters]
  )

  const filterData = useCallback(
    (values: IFilters) => {
      setFilters(values)
    },
    [filters]
  )

  const contextValue = {
    filters,
    filterData,
    updateFilters
  }

  return (
    <Context.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Context.Provider>
  )
}

export const useFilterContext = () => useContext(Context)
