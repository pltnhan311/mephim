import React, { useState, useCallback } from 'react'
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
    <div className='text-sm text-gray-300 tracking-wide leading-7 text-pretty font-light'>
      {showFullContent
        ? stripHtmlTags(movieData?.content)
        : `${stripHtmlTags(movieData?.content)?.slice(0, CONTENT_PREVIEW_LENGTH)}...`}
      {(movieData?.content?.length || 0) > CONTENT_PREVIEW_LENGTH && (
        <div className='w-fit flex items-center justify-start bg-gradient-to-r from-orange-500 to-pink-500 px-3 py-0.5 text-sm rounded-md mt-3 shadow-sm hover:from-blue-500 hover:to-purple-500 transition-all ease-in-out duration-300'>
          <button onClick={toggleContent} className='text-white transition-colors'>
            {showFullContent ? 'Thu gọn' : 'Mở rộng'}
          </button>
        </div>
      )}
    </div>
  )
}

export default MovieContent
