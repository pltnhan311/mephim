import { useMemo, useState } from 'react'
import { useMovies } from '~/api/movie/use-movies'
import Movie from '~/components/intro/Movie'
import PaginateIndicator from '~/components/intro/PaginateIndicator'
import { MovieItem } from '~/types/movie/movie-types'

const FeatureMovie = () => {
  const { data } = useMovies({ type: 'sap-chieu' })
  const [activeMovieIndex, setActiveMovieIndex] = useState(0)

  const items: MovieItem[] = useMemo(() => data?.items || [], [data])
  const activeMovie = useMemo(() => items[activeMovieIndex], [activeMovieIndex, items])

  return (
    <div className='relative'>
      {activeMovie && (
        <Movie key={activeMovie._id} item={activeMovie} data={data?.items[activeMovieIndex] as MovieItem} />
      )}
      <PaginateIndicator
        movies={items.slice(0, 5)}
        activeIndex={activeMovieIndex}
        setActiveIndex={setActiveMovieIndex}
      />
    </div>
  )
}

export default FeatureMovie
