import axiosApi from '~/api/axiosApi'
import { MovieData } from '~/types/movie/movie-types'

const tvShowsApi = {
  getTvShowsList: async (params: {
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

    const { data } = await axiosApi.get<MovieData>(`/danh-sach/${type}?${queryParams}`)
    return data || {}
  }
}

export default tvShowsApi
