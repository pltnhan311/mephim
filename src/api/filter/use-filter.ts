import { useQuery } from '@tanstack/react-query'
import filterKeys from '~/api/filter/query-key'
import filterApi from '~/api/filter/filter-api'

export const useFilterGenre = () => {
  return useQuery({
    queryKey: filterKeys.genre(),
    queryFn: () => filterApi.getFilterGenre()
  })
}

export const useFilterCountry = () => {
  return useQuery({
    queryKey: filterKeys.country(),
    queryFn: () => filterApi.getFilterCountry()
  })
}
