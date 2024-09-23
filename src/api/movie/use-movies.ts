import { useQuery } from '@tanstack/react-query'
import movieApi from '~/api/movie/movie-api'
import movieKeys from '~/api/movie/query-key'

export const useMovies = (type: string) => {
  return useQuery({
    queryKey: movieKeys.movieList(type),
    queryFn: () => movieApi.getMovieList(type)
  })
}
