import React from 'react'
import { APP_DOMAIN_CDN_IMAGE } from '~/constant/constant'
import { MovieItem } from '~/types/movie/movie-types'

interface BackgroundImageProps {
  item: MovieItem
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({ item }) => (
  <div className='absolute inset-0 rounded-lg'>
    <img
      className='h-full w-full object-cover brightness-75 rounded-lg'
      src={`${APP_DOMAIN_CDN_IMAGE}/uploads/movies/${item.thumb_url.replace('thumb', 'poster')}`}
      alt={item.name}
    />
    <div className='absolute inset-y-0 left-0 w-full bg-gradient-to-r from-black to-transparent rounded-lg'></div>
  </div>
)

export default React.memo(BackgroundImage)
