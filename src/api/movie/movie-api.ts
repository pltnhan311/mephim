import axiosApi from '~/api/axiosApi'
import { MovieData, MovieDetailData } from '~/types/movie/movie-types'

const movieApi = {
  getMovieList: async (params: {
    type: string
    category?: string
    country?: string
    year?: string
    sort_field?: string
    page?: number
  }) => {
    const { type, category = '', country = '', year = '', sort_field = '', page = 1 } = params
    const queryParams = new URLSearchParams({
      category,
      country,
      year,
      sort_field,
      page: page.toString()
    }).toString()

    const { data } = await axiosApi.get<MovieData>(`/danh-sach/phim-${type}?${queryParams}`)
    return data || {}
  },

  getMovieDetail: async (movieSlug: string) => {
    const { data } = await axiosApi.get<MovieDetailData>(`/phim/${movieSlug}`)
    return data || {}
  },

  getMovieSearch: async (keyword: string) => {
    const { data } = await axiosApi.get<MovieData>(`/tim-kiem?keyword=${keyword}`)
    return data || {}
  },

  getMovieFilter: async (filterType: string, filter: string) => {
    const { data } = await axiosApi.get<MovieData>(`/${filterType}/${filter}`)
    return data || {}
  }
}

export default movieApi
