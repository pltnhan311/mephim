import { LazyLoadImage } from 'react-lazy-load-image-component'
import { APP_DOMAIN_CDN_IMAGE } from '~/constant/constant'
import { MovieItem } from '~/types/movie/movie-types'

const SearchItemResult = ({ item }: { item: MovieItem }) => {
  return (
    <div className='flex items-center space-x-4 p-3'>
      <LazyLoadImage
        src={
          item.poster_url
            ? `${APP_DOMAIN_CDN_IMAGE}/uploads/movies/${item.poster_url}`
            : 'https://via.placeholder.com/92x138'
        }
        alt={item.name}
        className='h-24 w-16 rounded object-cover'
        effect='blur'
      />
      <div className='flex-1'>
        <h3 className='font-medium text-slate-200 hover:text-orange-400'>{item.name}</h3>
        <p className='text-sm text-gray-400'>
          {item.name} - {item.year}
        </p>
        {item?.tmdb?.vote_average && (
          <div className='mt-1 flex items-center'>
            <span className='mr-1 text-yellow-400'>★</span>
            <span className='text-sm text-gray-300'>{item?.tmdb?.vote_average.toFixed(1)}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchItemResult
