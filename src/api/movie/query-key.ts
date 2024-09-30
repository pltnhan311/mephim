import { MovieParams } from './use-movies'

const movieKeys = {
  all: ['movies'] as const,
  lists: () => [...movieKeys.all, 'list'] as const,
  list: (params: MovieParams) => [...movieKeys.lists(), params] as const,
  details: () => [...movieKeys.all, 'detail'] as const,
  detail: (movieSlug: string) => [...movieKeys.details(), movieSlug] as const,
  search: (keyword: string) => [...movieKeys.all, 'search', keyword] as const,
  filter: (slug: string, filter: string) => [...movieKeys.all, 'filter', slug, filter] as const
}

export default movieKeys
