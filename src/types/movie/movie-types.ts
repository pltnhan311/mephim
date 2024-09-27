export interface MovieItem {
  tmdb: {
    type: string
    id: string
    season: number | null
    vote_average: number
    vote_count: number
  }
  imdb: {
    id: string
  }
  modified: {
    time: string
  }
  _id: string
  name: string
  slug: string
  origin_name: string
  type: string
  thumb_url: string
  poster_url: string
  sub_docquyen: boolean
  chieurap: boolean
  time: string
  episode_current: string
  quality: string
  lang: string
  year: number
  category: {
    id: string
    name: string
    slug: string
  }[]
  country: {
    id: string
    name: string
    slug: string
  }[]
}

export interface SeoOnPage {
  og_type: string
  titleHead: string
  descriptionHead: string
  og_image: string[]
  og_url: string
}

export interface BreadCrumb {
  _id: string
  name: string
  slug: string
}

export interface Pagination {
  totalItems: number
  totalItemsPerPage: number
  currentPage: number
  pageRanges: number
}

export interface Params {
  type_slug: string
  filterCategory: string[]
  filterCountry: string[]
  filterYear: string
  filterType: string
  sortField: string
  sortType: string
  pagination: Pagination
}

export interface MovieResponse {
  status: string
  message: string
  data: MovieData
}

export interface MovieData {
  seoOnPage: SeoOnPage
  breadCrumb: BreadCrumb[]
  titlePage: string
  items: MovieItem[]
  params: Params
  type_list: string
  APP_DOMAIN_FRONTEND: string
  APP_DOMAIN_CDN_IMAGE: string
}

export interface MovieDetailData {
  seoOnPage: SeoOnPage
  breadCrumb: BreadCrumb[]
  item: MovieDetailSlug
  params: Params
}

export interface MovieDetailSlug {
  tmdb: {
    type: string
    id: string
    season: string | null
    vote_average: number
    vote_count: number
  }
  imdb: {
    id: string
  }
  created: {
    time: string
  }
  modified: {
    time: string
  }
  _id: string
  name: string
  origin_name: string
  content: string
  type: string
  status: string
  thumb_url: string
  is_copyright: boolean
  trailer_url: string
  time: string
  episode_current: string
  episode_total: string
  quality: string
  lang: string
  notify: string
  showtimes: string
  slug: string
  year: number
  view: number
  actor: string[]
  director: string[]
  category: {
    id: string
    name: string
    slug: string
  }[]
  country: {
    id: string
    name: string
    slug: string
  }[]
  chieurap: boolean
  poster_url: string
  sub_docquyen: boolean
  episodes: {
    server_name: string
    server_data: {
      name: string
      slug: string
      filename: string
      link_embed: string
      link_m3u8: string
    }[]
  }[]
}
