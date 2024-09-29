import { LazyLoadImage } from 'react-lazy-load-image-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faChevronDown, IconDefinition, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { APP_DOMAIN_CDN_IMAGE } from '~/constant/constant'
import { MovieDetailSlug } from '~/types/movie/movie-types'
import { useNavigate } from 'react-router-dom'

interface MoviePosterProps {
  movieData: MovieDetailSlug
  showEpisode: boolean
  setShowEpisode: (show: boolean) => void
}

const MoviePoster = ({ movieData, showEpisode, setShowEpisode }: MoviePosterProps) => {
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
          className='w-full rounded-lg shadow-lg brightness-80'
          effect='blur'
          wrapperProps={{
            style: { transitionDelay: '0.2s' }
          }}
        />
        <div className='absolute bottom-4 left-4 right-4 flex gap-4'>
          <PosterButton
            icon={showEpisode ? faChevronUp : faChevronDown}
            text='Tập phim'
            gradientFrom='from-emerald-600'
            gradientTo='to-indigo-500'
            shadowColor='#4eb2cbb8'
            onClick={() => setShowEpisode(!showEpisode)}
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
      className={`relative flex items-center bg-gradient-to-r ${gradientFrom} ${gradientTo} hover:${gradientTo} hover:${gradientFrom} text-white py-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl flex-1 justify-center text-sm`}
      style={{
        boxShadow: `0 2px 4px ${shadowColor}`
      }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} className='mr-2' />
      <p className='text-white font-light'>{text}</p>
    </button>
  )
}

export default MoviePoster
