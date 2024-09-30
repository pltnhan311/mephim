import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { useModalContext } from '~/context/ModalProvider'
import { useMovie } from '~/api/movie/use-movie'
import { MovieItem } from '~/types/movie/movie-types'
import { getYouTubeEmbedUrl } from '~/constant/constant'

interface MovieActionsProps {
  data: MovieItem
}

const MovieActions: React.FC<MovieActionsProps> = ({ data }) => {
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
      {movie?.item?.trailer_url && (
        <button
          className='flex items-center rounded bg-basicIndigo px-4 py-2 transition-all hover:bg-indigo-700 shadow-lg transform hover:scale-105'
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={faPlay} className='mr-2' /> Trailer
        </button>
      )}
      <Link to={`/chi-tiet/${data.slug}`}>
        <button className='flex items-center rounded bg-gray-600 bg-opacity-70 px-4 py-2 transition-all hover:bg-opacity-80 shadow-lg transform hover:scale-105'>
          <FontAwesomeIcon icon={faInfoCircle} className='mr-2' /> More Info
        </button>
      </Link>
    </div>
  )
}

export default React.memo(MovieActions)
