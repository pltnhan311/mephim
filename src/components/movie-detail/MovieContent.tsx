import React, { useState, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { MovieDetailSlug } from '~/types/movie/movie-types'
import { stripHtmlTags } from '~/constant/constant'

const CONTENT_PREVIEW_LENGTH = 200

interface MovieContentProps {
  movieData: MovieDetailSlug
}

const MovieContent: React.FC<MovieContentProps> = ({ movieData }) => {
  const [showFullContent, setShowFullContent] = useState(false)

  const toggleContent = useCallback(() => setShowFullContent((prev) => !prev), [])

  return (
    <div className='mt-6'>
      <p className='text-2xl font-medium mb-2 text-amber-500'>
        {movieData?.name + ' - ' + movieData?.episode_current + ' - ' + movieData?.lang + '+' + movieData?.quality}
      </p>
      <div className='my-6'>
        <div className='w-fit bg-gray-800 px-4 py-2 rounded-t-md shadow-sm flex items-center gap-2'>
          <FontAwesomeIcon icon={faList} className='text-amber-500' />
          <p className='font-medium text-yellow-500'>{movieData?.episodes?.map((episode) => episode.server_name)}</p>
        </div>
      </div>
      <div className='text-sm text-gray-300 tracking-wide leading-7 text-pretty font-light'>
        {showFullContent
          ? stripHtmlTags(movieData?.content)
          : `${stripHtmlTags(movieData?.content)?.slice(0, CONTENT_PREVIEW_LENGTH)}...`}
        {(movieData?.content?.length || 0) > CONTENT_PREVIEW_LENGTH && (
          <div className='w-fit flex items-center justify-start bg-gradient-to-r from-orange-500 to-pink-500 px-3 py-0.5 text-sm rounded-md mt-2 shadow-sm hover:from-blue-500 hover:to-purple-500 transition-all ease-in-out duration-300'>
            <button onClick={toggleContent} className='text-white transition-colors'>
              {showFullContent ? 'Thu gọn' : 'Mở rộng'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MovieContent
