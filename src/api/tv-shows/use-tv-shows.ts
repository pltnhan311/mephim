import { useQuery } from '@tanstack/react-query'
import tvShowsApi from '~/api/tv-shows/tv-shows-api'
import tvShowsKeys from '~/api/tv-shows/query-key'

export interface TvShowParams {
  type: string
  category?: string
  country?: string
  year?: string
  sort_field?: string
  page?: number
}

export const useTvShows = (params: TvShowParams) => {
  const { type, category, country, year, sort_field, page } = params

  return useQuery({
    queryKey: tvShowsKeys.tvShowsList(params),
    queryFn: () =>
      tvShowsApi.getTvShowsList({
        type,
        category,
        country,
        year,
        sort_field,
        page
      })
  })
}
