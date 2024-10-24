import { FormEvent } from "react"

export interface IContext {
  filters: IFilters
  filterData: (values: IFilters) => void
  updateFilters: (val: Partial<IFilters> | IFilters) => void
}

export interface IFilters {
  title?: string
  category?: string
  priceRange?: string
}