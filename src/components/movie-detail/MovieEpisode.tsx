import { faList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { MovieDetailSlug } from '~/types/movie/movie-types'

interface MovieEpisodeProps {
  movieData: MovieDetailSlug
  activeEpisode: string
  setActiveEpisode: (episode: string) => void
}

const MovieEpisode: React.FC<MovieEpisodeProps> = ({ movieData, activeEpisode, setActiveEpisode }) => {
  const navigate = useNavigate()
  const episodes = movieData?.episodes?.[0]?.server_data

  return (
    <div className='my-6'>
      <div className='w-48 bg-gray-800 px-4 py-2 rounded-t-md shadow-sm flex items-center gap-2'>
        <FontAwesomeIcon icon={faList} className='text-amber-500' />
        <p className='font-medium text-amber-500 uppercase text-sm'>
          {movieData?.episodes?.map((episode) => episode.server_name)}
        </p>
      </div>
      <div className='flex flex-wrap items-center gap-2 bg-gray-800 p-3 rounded-b-md rounded-tr-md shadow-sm'>
        {episodes?.map((episode) => (
          <button
            key={episode.slug}
            className={`w-9 h-9 bg-gray-700 rounded-md flex items-center justify-center text-sm font-semibold transition-colors duration-200 ease-in-out hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 ${
              activeEpisode === episode.name ? '!bg-yellow-600 hover:!bg-yellow-700' : ''
            }`}
            onClick={() => {
              setActiveEpisode(episode.name)
              navigate(`/xem-phim/${movieData.slug}`)
            }}
          >
            {episode.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default MovieEpisode
