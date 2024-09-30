import { MovieItem } from '~/types/movie/movie-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faClock, faLanguage, faVideo } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { formatDuration } from '~/utils'
import CircularRating from '~/components/CircularRating'

interface MovieInfoProps {
  item: MovieItem
  data: MovieItem
}

const MovieInfo: React.FC<MovieInfoProps> = ({ item, data }) => (
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

export default React.memo(MovieInfo)
