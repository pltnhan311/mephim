import axiosApi from '~/api/axiosApi'
import { MovieData } from '~/types/movie/movie-types'

const movieApi = {
  getMovieList: async (type: string) => {
    const { data } = await axiosApi.get<MovieData>(`/danh-sach/phim-${type}`)
    return data || {}
  }
}

export default movieApi
