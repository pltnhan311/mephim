import { faCalendar, faClock, faInfoCircle, faLanguage, faPlay, faVideo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { APP_DOMAIN_CDN_IMAGE } from '~/constant/constant'
import { formatDuration } from '~/utils'
import CircularRating from '~/components/CircularRating'
import { MovieItem } from '~/types/movie/movie-types'

const Movie = ({ item, data }: { item: MovieItem } & { data: MovieItem }) => {
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
      className='h-full w-full object-cover brightness-50 rounded-lg'
      src={`${APP_DOMAIN_CDN_IMAGE}/uploads/movies/${item.thumb_url.replace('thumb', 'poster')}`}
      alt={item.name}
    />
    <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-black rounded-lg'></div>
  </div>
)

const MovieDetails = ({ item, data }: { item: MovieItem } & { data: MovieItem }) => (
  <div className='absolute translate-y-1/2 left-20 right-0 flex flex-col items-start justify-center p-6 md:p-10'>
    <h2 className='text-[#eb5e33] font-black tracking-wide text-3xl md:text-5xl mb-2'>{item.origin_name}</h2>
    <h2 className='mb-6 max-w-2xl text-xl md:text-2xl text-white font-bold'>{item.name}</h2>
    <MovieInfo item={item} data={data} />
    <MovieActions data={data} />
  </div>
)

const MovieInfo = ({ item, data }: { item: MovieItem } & { data: MovieItem }) => (
  <div className='mb-6 flex flex-col items-start space-y-1'>
    <div className='flex items-center space-x-5'>
      <span className='flex items-center rounded-full border border-white px-2 py-1 font-semibold text-white'>
        {item.year ? 'T13' : 'T18'}
      </span>
      <span className='flex items-center text-lg text-gray-300 space-x-5'>
        <FontAwesomeIcon icon={faCalendar} className='mr-1' /> {item.year}
        <FontAwesomeIcon icon={faClock} className='mr-1' /> {formatDuration(item.time)}
        <div className='relative h-12 w-12'>
          <CircularRating vote_average={data.tmdb?.vote_average} />
        </div>
      </span>
    </div>
    <span className='flex items-center text-lg text-gray-300'>
      <FontAwesomeIcon icon={faLanguage} className='mr-2' /> Ngôn ngữ: {item.lang ? item.lang : 'N/A'}
    </span>
    <span className='flex items-center text-lg text-gray-300'>
      <FontAwesomeIcon icon={faVideo} className='mr-2' /> Chất lượng: {item.quality ? item.quality : 'N/A'}
    </span>
  </div>
)

const MovieActions = ({ data }: { data: MovieItem }) => (
  <div className='flex space-x-4'>
    <button className='flex items-center rounded bg-red-600 text-white px-6 py-2 transition-all hover:bg-red-700 shadow-lg transform hover:scale-105'>
      <FontAwesomeIcon icon={faPlay} className='mr-2' /> Trailer
    </button>
    <Link to={`/movie/${data._id}`}>
      <button className='flex items-center rounded bg-gray-600 bg-opacity-70 px-6 py-2 text-white transition-all hover:bg-opacity-80 shadow-lg transform hover:scale-105'>
        <FontAwesomeIcon icon={faInfoCircle} className='mr-2' /> More Info
      </button>
    </Link>
  </div>
)

export default Movie
