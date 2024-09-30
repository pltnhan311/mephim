import React from 'react'
import { MovieItem } from '~/types/movie/movie-types'
import MovieInfo from './MovieInfo'
import MovieActions from './MovieAction'

interface MovieDetailsProps {
  item: MovieItem
  data: MovieItem
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ item, data }) => (
  <div className='absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex flex-col items-start justify-center p-4 md:p-10 md:left-20'>
    <h2 className='text-basicLime font-black tracking-normal text-base md:text-3xl lg:text-5xl mb-2'>
      {item.origin_name}
    </h2>
    <h2 className='mb-4 md:mb-6 max-w-2xl text-sm md:text-xl lg:text-2xl font-medium md:font-bold'>{item.name}</h2>
    <MovieActions data={data} />
    <div className='hidden md:flex'>
      <MovieInfo item={item} data={data} />
    </div>
  </div>
)

export default React.memo(MovieDetails)
