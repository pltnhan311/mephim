import { useQuery } from '@tanstack/react-query'
import movieApi from '~/api/movie/movie-api'
import movieKeys from '~/api/movie/query-key'

export const useMovies = (type: string, sort_field?: string) => {
  return useQuery({
    queryKey: movieKeys.movieList(type, sort_field),
    queryFn: () => movieApi.getMovieList({ type, sort_field })
  })
}
