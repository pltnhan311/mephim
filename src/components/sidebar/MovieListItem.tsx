import { APP_DOMAIN_CDN_IMAGE } from '~/constant/constant'
import { MovieItem } from '~/types/movie/movie-types'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import React from 'react'

const MovieListItem = ({ item }: { item: MovieItem }) => {
  const {
    origin_name,
    name,
    thumb_url,
    year,
    tmdb: { vote_average }
  } = item

  return (
    <div className='relative flex gap-4 items-center p-4 rounded-lg overflow-hidden group hover:shadow-lg transition-shadow duration-300 border border-white/10'>
      <div className='absolute inset-0 bg-gradient-to-r from-black/10 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
      <div className='h-36 w-24 overflow-hidden rounded-md z-10 flex-shrink-0'>
        <LazyLoadImage
          src={
            thumb_url ? `${APP_DOMAIN_CDN_IMAGE}/uploads/movies/${thumb_url}` : 'https://via.placeholder.com/112x168'
          }
          alt={origin_name || name}
          effect='blur'
          className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
          wrapperProps={{
            style: { transitionDelay: '0.2s' }
          }}
        />
      </div>
      <div className='flex flex-col font-light space-y-2 max-w-[300px] pr-8 z-10'>
        <p className='text-lg text-blue-400 font-medium break-words group-hover:text-blue-300 transition-colors duration-300'>
          {origin_name}
        </p>
        <p className='text-sm break-words text-gray-200 group-hover:text-white transition-colors duration-300'>
          {name}
        </p>
        <p className='text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300'>{year}</p>

        {vote_average > 0 && (
          <div className='mt-1 flex items-center'>
            <span className='mr-1 text-yellow-400'>★</span>
            <span className='text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300'>
              {vote_average.toFixed(1)}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default React.memo(MovieListItem)
