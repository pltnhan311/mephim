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
    <div className='relative h-[80vh] w-full'>
      <BackgroundImage item={item} />
      <MovieDetails item={item} data={data} />
    </div>
  )
}

export default React.memo(Movie)
