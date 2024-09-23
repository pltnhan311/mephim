const movieKeys = {
  movieList: (type: string) => ['movieList', type]
  // movie: (slug: string) => ['movie', slug] as const
}

export default movieKeys
