import axiosApi from '~/api/axiosApi'
import { IFilterItem } from '~/types/filter/filter-types'
import { MovieData } from '~/types/movie/movie-types'

const filterApi = {
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
  },

  getFilterGenre: async () => {
    const { data } = await axiosApi.get<IFilterItem>('/the-loai')
    return data || []
  },

  getFilterCountry: async () => {
    const { data } = await axiosApi.get<IFilterItem>('/quoc-gia')
    return data || []
  }
}

export default filterApi
