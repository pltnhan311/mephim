import { APP_DOMAIN_CDN_IMAGE } from '~/constant/constant'
import { MovieItem } from '~/types/movie/movie-types'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

const MovieListItem = ({ item }: { item: MovieItem }) => {
  const {
    origin_name,
    name,
    thumb_url,
    year,
    tmdb: { vote_average }
  } = item

  return (
    <div className='flex gap-3 items-center p-3 border rounded-lg border-slate-700 hover:bg-slate-800 transition-colors duration-300'>
      <div className='min-h-36 max-h-36 min-w-24 max-w-24 overflow-hidden rounded'>
        <LazyLoadImage
          src={thumb_url ? `${APP_DOMAIN_CDN_IMAGE}/uploads/movies/${thumb_url}` : 'https://via.placeholder.com/92x138'}
          alt={origin_name || name}
          effect='blur'
          className='w-full h-full object-cover'
          wrapperProps={{
            style: { transitionDelay: '0.2s' }
          }}
        />
      </div>
      <div className='flex flex-col font-light space-y-1 max-w-[300px] pr-8'>
        <p className='text-lg text-blue-500 font-medium break-words'>{origin_name}</p>
        <p className='text-base break-words'>{name}</p>
        <p className='text-sm text-gray-400'>{year}</p>

        {vote_average > 0 && (
          <div className='mt-1 flex items-center'>
            <span className='mr-1 text-yellow-400'>★</span>
            <span className='text-sm text-gray-300'>{vote_average.toFixed(1)}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default MovieListItem
