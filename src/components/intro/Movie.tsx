import React from 'react'
import { MovieItem } from '~/types/movie/movie-types'
import BackgroundImage from './BackgroundImage'
import MovieDetails from './MovieDetails'

interface MovieProps {
  item: MovieItem
  data: MovieItem
}

const Movie: React.FC<MovieProps> = ({ item, data }) => {
  return (
    <div className='relative h-[25vh] sm:min-h-[80vh] w-full p-4 md:p-0'>
      <BackgroundImage item={item} />
      <MovieDetails item={item} data={data} />
    </div>
  )
}

export default React.memo(Movie)
