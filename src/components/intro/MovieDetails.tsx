import React from 'react'
import { MovieItem } from '~/types/movie/movie-types'
import MovieInfo from './MovieInfo'
import MovieActions from './MovieAction'

interface MovieDetailsProps {
  item: MovieItem
  data: MovieItem
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ item, data }) => (
  <div className='absolute translate-y-1/2 left-20 right-0 flex flex-col items-start justify-center p-6 md:p-10'>
    <h2 className='text-basicLime font-black tracking-normal text-3xl md:text-5xl mb-2'>{item.origin_name}</h2>
    <h2 className='mb-6 max-w-2xl text-xl md:text-2xl font-bold'>{item.name}</h2>
    <MovieInfo item={item} data={data} />
    <MovieActions data={data} />
  </div>
)

export default React.memo(MovieDetails)
