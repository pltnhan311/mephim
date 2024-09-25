import { useQuery } from '@tanstack/react-query'
import movieApi from '~/api/movie/movie-api'
import movieKeys from '~/api/movie/query-key'

export interface MovieParams {
  type: string
  category?: string
  country?: string
  year?: string
  sort_field?: string
  page?: number
}

export const useMovies = (params: MovieParams) => {
  const { type, category, country, year, sort_field, page } = params

  return useQuery({
    queryKey: movieKeys.list(params),
    queryFn: () =>
      movieApi.getMovieList({
        type,
        category,
        country,
        year,
        sort_field,
        page
      })
  })
}
