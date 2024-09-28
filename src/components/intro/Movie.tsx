import { faCalendar, faClock, faInfoCircle, faLanguage, faPlay, faVideo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { APP_DOMAIN_CDN_IMAGE, getYouTubeEmbedUrl } from '~/constant/constant'
import { formatDuration } from '~/utils'
import CircularRating from '~/components/CircularRating'
import { MovieItem } from '~/types/movie/movie-types'
import { useModalContext } from '~/context/ModalProvider'
import { useMovie } from '~/api/movie/use-movie'

export default function Movie({ item, data }: { item: MovieItem } & { data: MovieItem }) {
  return (
    <div className='relative h-[80vh] w-full'>
      <BackgroundImage item={item} />
      <MovieDetails item={item} data={data} />
    </div>
  )
}

const BackgroundImage = ({ item }: { item: MovieItem }) => (
  <div className='absolute inset-0 rounded-lg'>
    <img
      className='h-full w-full object-cover brightness-75 rounded-b-lg'
      src={`${APP_DOMAIN_CDN_IMAGE}/uploads/movies/${item.thumb_url.replace('thumb', 'poster')}`}
      alt={item.name}
    />
    <div className='absolute inset-y-0 left-0 w-full bg-gradient-to-r from-black to-transparent rounded-b-lg'></div>
  </div>
)

const MovieDetails = ({ item, data }: { item: MovieItem } & { data: MovieItem }) => (
  <div className='absolute translate-y-1/2 left-20 right-0 flex flex-col items-start justify-center p-6 md:p-10'>
    <h2 className='text-[#b3eb30] font-black tracking-normal text-3xl md:text-5xl mb-2'>{item.origin_name}</h2>
    <h2 className='mb-6 max-w-2xl text-xl md:text-2xl font-bold'>{item.name}</h2>
    <MovieInfo item={item} data={data} />
    <MovieActions data={data} />
  </div>
)

const MovieInfo = ({ item, data }: { item: MovieItem } & { data: MovieItem }) => (
  <div className='mb-6 flex flex-col items-start space-y-2 text-lightGhostWhite'>
    <div className='flex items-center space-x-6'>
      <span className='flex items-center rounded-full border border-white px-3 py-1 font-semibold'>
        {item.year ? 'T13' : 'T18'}
      </span>
      <span className='flex items-center space-x-5'>
        <FontAwesomeIcon icon={faCalendar} className='mr-1' /> {item.year}
        <FontAwesomeIcon icon={faClock} className='mr-1' /> {formatDuration(item.time)}
        <div className='relative h-12 w-12'>
          {data.tmdb?.vote_average > 0 && <CircularRating vote_average={data.tmdb?.vote_average} />}
        </div>
      </span>
    </div>
    <span className='flex items-center justify-start'>
      <FontAwesomeIcon icon={faLanguage} className='mr-2' /> Ngôn ngữ: {item.lang ? item.lang : 'N/A'}
    </span>
    <span className='flex items-center justify-start'>
      <FontAwesomeIcon icon={faVideo} className='mr-2' /> Chất lượng: {item.quality ? item.quality : 'N/A'}
    </span>
  </div>
)

const MovieActions = ({ data }: { data: MovieItem }) => {
  const { openPopup } = useModalContext()
  const { data: movie } = useMovie(data.slug)

  const handleClick = () => {
    openPopup(
      <iframe
        title='Trailer'
        src={getYouTubeEmbedUrl(movie?.item?.trailer_url || '')}
        className='aspect-video w-full max-w-4xl'
        allowFullScreen
      />
    )
  }

  return (
    <div className='flex space-x-4 text-sm mt-2'>
      <button
        className='flex items-center rounded bg-basicIndigo text-white px-4 py-2 transition-all hover:bg-indigo-700 shadow-lg transform hover:scale-105'
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faPlay} className='mr-2' /> Trailer
      </button>
      <Link to={`/chi-tiet/${data.slug}`}>
        <button className='flex items-center rounded bg-gray-600 bg-opacity-70 px-4 py-2 text-white transition-all hover:bg-opacity-80 shadow-lg transform hover:scale-105'>
          <FontAwesomeIcon icon={faInfoCircle} className='mr-2' /> More Info
        </button>
      </Link>
    </div>
  )
}
