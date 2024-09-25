// const movieKeys = {
//   movieList: (type: string, sort_field?: string) => ['movieList', type, sort_field]
//   // movie: (slug: string) => ['movie', slug] as const
// }

// export default movieKeys

import { MovieParams } from './use-movies'

const movieKeys = {
  all: ['movies'] as const,
  lists: () => [...movieKeys.all, 'list'] as const,
  list: (params: MovieParams) => [...movieKeys.lists(), params] as const,
  details: () => [...movieKeys.all, 'detail'] as const,
  detail: (id: string) => [...movieKeys.details(), id] as const
}

export default movieKeys
