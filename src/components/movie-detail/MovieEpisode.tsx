import { MovieDetailSlug } from '~/types/movie/movie-types'

interface MovieContentProps {
  movieData: MovieDetailSlug
}

const MovieEpisode: React.FC<MovieContentProps> = ({ movieData }) => {
  const episodes = movieData?.episodes?.[0]?.server_data
  return (
    <div className='my-5 flex flex-wrap items-center gap-3 bg-gray-800 p-4 rounded-b-md shadow-sm'>
      {episodes?.map((episode) => (
        <button
          key={episode.slug}
          className='w-9 h-9 bg-gray-700 rounded-md flex items-center justify-center text-sm font-semibold transition-colors duration-200 ease-in-out hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50'
        >
          {episode.name}
        </button>
      ))}
    </div>
  )
}

export default MovieEpisode
