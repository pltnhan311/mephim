const movieKeys = {
  movieList: (type: string, sort_field?: string) => ['movieList', type, sort_field]
  // movie: (slug: string) => ['movie', slug] as const
}

export default movieKeys
