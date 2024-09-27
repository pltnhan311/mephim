import { MovieParams } from './use-movies'

const movieKeys = {
  all: ['movies'] as const,
  lists: () => [...movieKeys.all, 'list'] as const,
  list: (params: MovieParams) => [...movieKeys.lists(), params] as const,
  details: () => [...movieKeys.all, 'detail'] as const,
  detail: (movieSlug: string) => [...movieKeys.details(), movieSlug] as const
}

export default movieKeys
