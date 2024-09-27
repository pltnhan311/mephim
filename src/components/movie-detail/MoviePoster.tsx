import { LazyLoadImage } from 'react-lazy-load-image-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faChevronDown, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { APP_DOMAIN_CDN_IMAGE } from '~/constant/constant'
import { MovieDetailSlug } from '~/types/movie/movie-types'
import { useNavigate } from 'react-router-dom'

interface MoviePosterProps {
  movieData: MovieDetailSlug
}

const MoviePoster = ({ movieData }: MoviePosterProps) => {
  const navigate = useNavigate()

  return (
    <div className='md:w-1/3'>
      <div className='relative'>
        <LazyLoadImage
          src={
            movieData?.thumb_url
              ? `${APP_DOMAIN_CDN_IMAGE}/uploads/movies/${movieData?.thumb_url}`
              : 'https://via.placeholder.com/500x750?text=No+Image'
          }
          alt={movieData?.name}
          className='w-full rounded-lg shadow-lg'
          effect='blur'
          wrapperProps={{
            style: { transitionDelay: '0.5s' }
          }}
        />
        <div className='absolute bottom-4 left-4 right-4 flex gap-4'>
          <PosterButton
            icon={faChevronDown}
            text='Tập phim'
            gradientFrom='from-emerald-600'
            gradientTo='to-indigo-500'
            shadowColor='#4eb2cbb8'
          />
          <PosterButton
            icon={faPlayCircle}
            text='Xem phim'
            gradientFrom='from-pink-500'
            gradientTo='to-orange-400'
            shadowColor='#f67956d0'
            onClick={() => navigate(`/xem-phim/${movieData?.slug}`)}
          />
        </div>
      </div>
    </div>
  )
}

interface PosterButtonProps {
  icon: IconDefinition
  text: string
  gradientFrom: string
  gradientTo: string
  shadowColor: string
  onClick?: () => void
}

const PosterButton = ({ icon, text, gradientFrom, gradientTo, shadowColor, onClick }: PosterButtonProps) => {
  return (
    <button
      className={`relative flex items-center bg-gradient-to-r ${gradientFrom} ${gradientTo} hover:${gradientTo} hover:${gradientFrom} text-white py-2 px-3 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl flex-1 justify-center text-sm lg:text-base`}
      style={{
        boxShadow: `0 3px 9px ${shadowColor}`
      }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} className='mr-2' />
      <p className='text-white font-light'>{text}</p>
      {/* <span
      className={`absolute inset-0 rounded-lg bg-gradient-to-r ${gradientFrom} ${gradientTo} opacity-50 blur`}
    ></span> */}
    </button>
  )
}

export default MoviePoster
