import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useMovieFilter } from '~/api/movie/use-movie-filter'
import MediaList from '~/components/media-list/MediaList'

const MovieFilter = () => {
  const { filterType, filter } = useParams()

  const { data } = useMovieFilter(filterType as string, filter as string)

  const filteredMovies = useMemo(() => data?.items || [], [data])

  return (
    <MediaList
      searchDataList={filteredMovies}
      title={
        filterType === 'the-loai'
          ? 'Thể loại ' + data?.titlePage || ''
          : filterType === 'quoc-gia'
            ? 'Quốc gia ' + data?.titlePage || ''
            : ''
      }
    />
  )
}

export default MovieFilter
