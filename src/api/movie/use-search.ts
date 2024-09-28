import { useQuery } from '@tanstack/react-query'
import movieApi from '~/api/movie/movie-api'
import movieKeys from '~/api/movie/query-key'

export const useSearch = (keyword: string) => {
  return useQuery({
    queryKey: movieKeys.search(keyword),
    queryFn: () => movieApi.getMovieSearch(keyword)
  })
}
