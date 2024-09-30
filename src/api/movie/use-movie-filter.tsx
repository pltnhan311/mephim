import { useQuery } from '@tanstack/react-query'
import movieApi from '~/api/movie/movie-api'
import movieKeys from '~/api/movie/query-key'

export const useMovieFilter = (filterType: string, filter: string) => {
  return useQuery({
    queryKey: movieKeys.filter(filterType, filter),
    queryFn: () => movieApi.getMovieFilter(filterType, filter)
  })
}
