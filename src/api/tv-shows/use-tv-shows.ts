import { useQuery } from '@tanstack/react-query'
import tvShowsApi from '~/api/tv-shows/tv-shows-api'
import tvShowsKeys from '~/api/tv-shows/query-key'

export const useTvShows = (type: string, sort_field?: string) => {
  return useQuery({
    queryKey: tvShowsKeys.tvShowsList(type, sort_field),
    queryFn: () => tvShowsApi.getTvShowsList({ type, sort_field })
  })
}
