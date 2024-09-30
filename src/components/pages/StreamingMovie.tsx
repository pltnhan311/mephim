import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useMovie } from '~/api/movie/use-movie'
import Breadcrumb from '~/components/Breadcrumb'
import Loading from '~/components/Loading'
import Sidebar from '~/components/sidebar/Sidebar'
import { MovieDetailSlug } from '~/types/movie/movie-types'
import { APP_DOMAIN_CDN_IMAGE } from '~/constant/constant'
import MovieContent from '~/components/movie-detail/MovieContent'
import MovieEpisode from '~/components/movie-detail/MovieEpisode'
import { useEpisodeContext } from '~/context/EpisodeProvider'
import MediaList from '~/components/media-list/MediaList'
import VideoPlayer from '~/components/video/VideoPlayer'
import useToggle from '~/custom-hook/use-toggle'

const StreamingMovie: React.FC = () => {
  const { movieSlug } = useParams<{ movieSlug: string }>()
  const { data, isLoading } = useMovie(movieSlug || '')
  const movieData = data?.item

  const [showVideo, setShowVideo] = useToggle(false)
  const [showContent, setShowContent] = useToggle(false)

  const { activeEpisode, setActiveEpisode, currentEpisode } = useEpisodeContext()

  if (isLoading) return <Loading />
  if (!movieData || !movieData.episodes?.[0]?.server_data?.[0]?.link_m3u8) {
    return <ErrorMessage />
  }

  const posterUrl = `${APP_DOMAIN_CDN_IMAGE}/uploads/movies/${movieData.poster_url || movieData.thumb_url}`

  return (
    <>
      <Breadcrumb breadCrumb={data?.breadCrumb || []} />
      <div className='flex flex-col xl:flex-row gap-8 mt-2'>
        <div className='w-full xl:w-[70%] mt-10'>
          {showVideo ? (
            <VideoPlayer url={currentEpisode?.link_m3u8 || ''} poster={posterUrl} />
          ) : (
            <PosterWithPlayButton posterUrl={posterUrl} onPlayClick={setShowVideo} />
          )}
          <MovieInfo movieData={movieData} />
          <ToggleableContent
            title='Nội dung phim'
            content={<MovieContent movieData={movieData} />}
            isOpen={showContent}
            onToggle={setShowContent}
          />
          <MovieEpisode
            movieData={movieData}
            activeEpisode={activeEpisode || movieData?.episodes?.[0]?.server_data?.[0]?.name}
            setActiveEpisode={setActiveEpisode}
          />
          <MediaList title='Có thể bạn sẽ thích' type='tv-shows' category='tv-shows' />
        </div>
        <div className='w-full xl:w-[30%] -mt-10'>
          <Sidebar />
        </div>
      </div>
    </>
  )
}

const ErrorMessage: React.FC = () => (
  <div className='flex flex-col items-center justify-center bg-gray-900'>
    <div className='text-4xl text-yellow-500 mb-4'>
      <FontAwesomeIcon icon={faExclamationTriangle} />
    </div>
    <h2 className='text-2xl font-bold text-yellow-500 mb-2'>Rất tiếc, phim này hiện chưa có link xem 😭</h2>
    <p className='text-gray-400 mb-4'>Mong bạn thông cảm. Mời bạn xem phim khác.</p>
    <Link to='/'>
      <button className='px-4 py-2 bg-gray-600/50 rounded hover:bg-gray-600/70 transition duration-300'>
        Xem phim khác
      </button>
    </Link>
  </div>
)

const PosterWithPlayButton: React.FC<{ posterUrl: string; onPlayClick: () => void }> = ({ posterUrl, onPlayClick }) => (
  <div className='relative aspect-video bg-black rounded-lg overflow-hidden shadow-lg'>
    <div
      className='relative w-full h-full bg-cover bg-center'
      style={{
        backgroundImage: `url(${posterUrl})`
      }}
    >
      <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
        <button
          onClick={onPlayClick}
          className='text-6xl hover:text-blue-400 transition-colors'
          aria-label='Play video'
        >
          ▶
        </button>
      </div>
    </div>
  </div>
)

const MovieInfo: React.FC<{ movieData: MovieDetailSlug }> = ({ movieData }) => (
  <div className='mt-6 bg-gray-800 p-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl'>
    <div className='mb-4 gap-3'>
      <h2 className='text-xl font-semibold text-amber-500 capitalize'>{movieData?.name}</h2>
      <p className='text-sm text-gray-400 mt-1'>
        {movieData?.episode_current} | {movieData?.quality} + {movieData?.lang}
      </p>
    </div>
  </div>
)

const ToggleableContent: React.FC<{
  title: string
  content: React.ReactNode
  isOpen: boolean
  onToggle: () => void
}> = ({ title, content, isOpen, onToggle }) => (
  <div className='border-t border-gray-700 pt-2'>
    <button
      onClick={onToggle}
      className='flex items-center justify-between w-full text-gray-300 hover:text-amber-500 transition-colors duration-300'
    >
      <span className='font-light'>{title}</span>
      <FontAwesomeIcon
        icon={faChevronDown}
        className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
      />
    </button>
    {isOpen && <div className='mt-3 text-gray-400 animate-fadeIn'>{content}</div>}
  </div>
)

export default React.memo(StreamingMovie)
