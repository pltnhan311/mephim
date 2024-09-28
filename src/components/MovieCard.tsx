import { Link } from 'react-router-dom'
import { MovieItem } from '~/types/movie/movie-types'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import CircularRating from '~/components/CircularRating'
import { APP_DOMAIN_CDN_IMAGE } from '~/constant/constant'

const MovieCard = ({ media }: { media: MovieItem }) => {
  const {
    poster_url,
    thumb_url,
    origin_name,
    name,
    lang,
    quality,
    episode_current,
    slug,
    tmdb: { vote_average }
  } = media

  return (
    <Link
      className='relative overflow-hidden flex flex-col rounded-lg bg-layout shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl max-h-[340px]'
      to={`/chi-tiet/${slug}`}
    >
      <div className='aspect-[2/3] overflow-hidden'>
        <LazyLoadImage
          className='h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110'
          src={
            poster_url
              ? `${APP_DOMAIN_CDN_IMAGE}/uploads/movies/${thumb_url}`
              : 'https://via.placeholder.com/500x750?text=No+Image'
          }
          alt={name}
          effect='blur'
          wrapperProps={{
            style: { transitionDelay: '0.2s' }
          }}
        />
      </div>
      <div className='px-2 py-2 text-center'>
        <p className='truncate text-[15px] font-medium text-lime'>{origin_name}</p>
        <p className='truncate text-sm font-light text-lightGhostWhite'>{name}</p>
      </div>
      {vote_average > 0 && (
        <div className='absolute right-2 top-2 h-10 w-10 rounded-full bg-black/50 p-0.5'>
          <CircularRating vote_average={vote_average} />
        </div>
      )}
      <div className='absolute left-2 top-2'>
        <span className='rounded-tl-md rounded-br-md rounded-tr bg-gradient-to-r from-pink-500 to-purple-700 px-2 py-1 text-xs shadow-lg'>
          <span className='relative z-10'>
            {quality}+{lang}
          </span>
          <span className='absolute inset-0 rounded-tl-md rounded-br-md rounded-tr bg-gradient-to-r from-pink-500 to-purple-700 opacity-50 blur'></span>
        </span>
      </div>
      <div className='absolute right-1 bottom-16'>
        <span className='rounded-tl-md rounded-br-md rounded-tr bg-gradient-to-r from-red-500 to-yellow-500 px-2 py-1 text-xs shadow-lg'>
          <span className='relative z-10'>{episode_current === 'Full' ? 'Hoàn tất' : episode_current}</span>
          <span className='absolute inset-0 rounded-tl-md rounded-br-md rounded-tr bg-gradient-to-r from-red-500 to-yellow-700 opacity-50 blur'></span>
        </span>
      </div>
    </Link>
  )
}

export default MovieCard
