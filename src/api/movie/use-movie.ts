import { useQuery } from '@tanstack/react-query'
import movieApi from '~/api/movie/movie-api'
import movieKeys from '~/api/movie/query-key'

export const useMovie = (movieSlug: string) => {
  return useQuery({
    queryKey: movieKeys.detail(movieSlug),
    queryFn: () => movieApi.getMovieDetail(movieSlug)
  })
}
