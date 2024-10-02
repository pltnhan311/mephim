import { TvShowParams } from './use-tv-shows'

const tvShowsKeys = {
  all: ['tvShows'] as const,
  lists: () => [...tvShowsKeys.all, 'list'] as const,
  tvShowsList: (params: TvShowParams) => [...tvShowsKeys.lists(), params] as const
}

export default tvShowsKeys
