export interface SeoOnPage {
  titleHead: string
  descriptionHead: string
  og_type: string
  og_image: string[]
}

export interface Category {
  id: string
  name: string
  slug: string
}

export interface Country {
  id: string
  name: string
  slug: string
}

export interface MovieItemSlider {
  modified: {
    time: string
  }
  _id: string
  name: string
  origin_name: string
  type: string
  thumb_url: string
  time: string
  episode_current: string
  quality: string
  lang: string
  slug: string
  year: number
  category: Category[]
  country: Country[]
  sub_docquyen: boolean
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
  sortField: string
  pagination: Pagination
  itemsUpdateInDay: number
  totalSportsVideos: number
  itemsSportsVideosUpdateInDay: number
}

export interface HomeData {
  seoOnPage: SeoOnPage
  items: MovieItemSlider[]
  itemsSportsVideos: string[]
  params: Params
  type_list: string
  APP_DOMAIN_FRONTEND: string
  APP_DOMAIN_CDN_IMAGE: string
}

export interface HomeApiResponse {
  status: string
  message: string
  data: HomeData
}
