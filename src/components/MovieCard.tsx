import React from 'react'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { APP_DOMAIN_CDN_IMAGE } from '~/constant/constant'
import { MovieItem } from '~/types/movie/movie-types'

interface MovieCardProps {
  media: MovieItem
}

const MovieCard: React.FC<MovieCardProps> = ({ media }) => {
  const { poster_url, thumb_url, origin_name, name, lang, quality, episode_current, slug } = media

  return (
    <Link
      className='relative overflow-hidden flex flex-col rounded-lg bg-layout shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl max-h-[340px]'
      to={`/chi-tiet/${slug}`}
    >
      <MovieImage poster_url={poster_url} thumb_url={thumb_url} name={name} />
      <MovieTitle origin_name={origin_name} name={name} />
      <QualityBadge quality={quality} lang={lang} />
      <EpisodeBadge episode_current={episode_current} />
    </Link>
  )
}

const MovieImage: React.FC<{ poster_url: string; thumb_url: string; name: string }> = ({
  poster_url,
  thumb_url,
  name
}) => (
  <div className='aspect-[2/3] overflow-hidden'>
    <LazyLoadImage
      className='h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-110'
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
)

const MovieTitle: React.FC<{ origin_name: string; name: string }> = ({ origin_name, name }) => (
  <div className='px-2 py-2 text-center'>
    <p className='truncate text-[15px] font-medium text-basicLime'>{origin_name}</p>
    <p className='truncate text-sm font-light text-lightGhostWhite'>{name}</p>
  </div>
)

const QualityBadge: React.FC<{ quality: string; lang: string }> = ({ quality, lang }) => (
  <div className='absolute left-2 top-2'>
    <span className='rounded-tl-md rounded-br-md rounded-tr bg-gradient-to-r from-pink-500 to-purple-700 px-2 py-1 text-xs shadow-lg'>
      <span className='relative z-10'>
        {quality}+{lang}
      </span>
      <span className='absolute inset-0 rounded-tl-md rounded-br-md rounded-tr bg-gradient-to-r from-pink-500 to-purple-700 opacity-50 blur'></span>
    </span>
  </div>
)

const EpisodeBadge: React.FC<{ episode_current: string }> = ({ episode_current }) => (
  <div className='absolute right-1 bottom-16'>
    <span className='rounded-tl-md rounded-br-md rounded-tr bg-gradient-to-r from-red-500 to-yellow-500 px-2 py-1 text-xs shadow-lg'>
      <span className='relative z-10'>{episode_current === 'Full' ? 'Hoàn tất' : episode_current}</span>
      <span className='absolute inset-0 rounded-tl-md rounded-br-md rounded-tr bg-gradient-to-r from-red-500 to-yellow-700 opacity-50 blur'></span>
    </span>
  </div>
)

export default React.memo(MovieCard)
