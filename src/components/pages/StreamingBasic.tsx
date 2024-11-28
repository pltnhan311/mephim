import React, { useCallback, useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { useMovie } from '~/api/movie/use-movie'
import Breadcrumb from '~/components/Breadcrumb'
import Loading from '~/components/Loading'
import Sidebar from '~/components/sidebar/Sidebar'
import { MovieDetailSlug } from '~/types/movie/movie-types'
import { APP_DOMAIN_CDN_IMAGE } from '~/constant/constant'
import MovieEpisode from '~/components/movie-detail/MovieEpisode'
import MediaList from '~/components/media-list/MediaList'
import useToggle from '~/custom-hook/use-toggle'
import { useEpisodeContext } from '~/context/EpisodeProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faExclamationTriangle, faPlay } from '@fortawesome/free-solid-svg-icons'
import MovieContent from '~/components/movie-detail/MovieContent'

const StreamingBasic = () => {
  const { movieSlug } = useParams()
  const { data, isLoading } = useMovie(movieSlug as string)
  const movieData = data?.item

  const [showContent, setShowContent] = useToggle(false)
  const [showVideo, setShowVideo] = useState(false)

  const { activeEpisode, setActiveEpisode, currentEpisode } = useEpisodeContext()

  const handlePlayClick = useCallback(() => setShowVideo(true), [setShowVideo])

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
          <div className='relative aspect-video bg-black/50 rounded-lg overflow-hidden shadow-lg'>
            {!showVideo ? (
              <div
                className='relative w-full h-full bg-cover bg-center'
                style={{
                  backgroundImage: `url(${posterUrl})`
                }}
              >
                <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                  <button
                    onClick={handlePlayClick}
                    className='text-white text-6xl hover:text-blue-400 transition-colors'
                  >
                    <FontAwesomeIcon icon={faPlay} />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <ReactPlayer
                  url={currentEpisode?.link_m3u8 || ''}
                  width='100%'
                  height='100%'
                  controls
                  playing={showVideo}
                  playsinline={true}
                  config={{
                    file: {
                      forceHLS: false,
                      attributes: {
                        controlsList: 'nodownload',
                        playsInline: true
                      }
                    }
                  }}
                />
              </>
            )}
          </div>
          {/* <Video src='https://vjs.zencdn.net/v/oceans.mp4' /> */}
          <MovieInfoWithToggleableContent
            movieData={movieData}
            contentTitle='Nội dung phim'
            content={<MovieContent movieData={movieData} />}
            isOpen={showContent}
            onToggle={setShowContent}
          />
          <MovieEpisode
            movieData={movieData}
            activeEpisode={activeEpisode || movieData?.episodes?.[0]?.server_data?.[0]?.name}
            setActiveEpisode={setActiveEpisode}
          />
          <MediaList title='Có thể bạn sẽ thích' mediaType={movieData?.type === 'phim-le' ? 'phim-le' : 'tv-shows'} />
        </div>
        <div className='w-full xl:w-[30%] -mt-10'>
          <Sidebar />
        </div>
      </div>
    </>
  )
}

// ... existing code ...

const MovieInfoWithToggleableContent: React.FC<{
  movieData: MovieDetailSlug
  contentTitle: string
  content: React.ReactNode
  isOpen: boolean
  onToggle: () => void
}> = ({ movieData, contentTitle, content, isOpen, onToggle }) => (
  <div className='mt-6 bg-subModal p-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl'>
    <div className='mb-4'>
      <p className='text-sm sm:text-base md:text-lg font-semibold text-amber-500 capitalize'>{movieData?.name}</p>
      <p className='text-xs sm:text-sm md:text-base text-gray-400 mt-1'>
        {movieData?.episode_current} | {movieData?.quality} + {movieData?.lang}
      </p>
    </div>
    <div className='border-t border-gray-700 pt-2'>
      <button
        onClick={onToggle}
        className='flex items-center justify-between w-full text-gray-300 hover:text-amber-500 transition-colors duration-300'
      >
        <span className='font-light'>{contentTitle}</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && <div className='mt-3 text-gray-400 animate-fadeIn'>{content}</div>}
    </div>
  </div>
)

const ErrorMessage: React.FC = () => {
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    const redirect = setTimeout(() => {
      navigate('/')
    }, 5000)

    return () => {
      clearInterval(timer)
      clearTimeout(redirect)
    }
  }, [navigate])

  return (
    <div className='fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50'>
      <div className='bg-container p-8 rounded-lg shadow-xl max-w-md w-full mx-4 animate-fadeIn'>
        <div className='text-4xl text-yellow-500 mb-4 flex justify-center'>
          <FontAwesomeIcon icon={faExclamationTriangle} className='animate-bounce' />
        </div>
        <h2 className='text-2xl font-bold text-yellow-500 mb-2 text-center'>
          Rất tiếc, phim này hiện chưa có link xem 😭
        </h2>
        <p className='text-gray-400 mb-6 text-center'>Mong bạn thông cảm. Đang chuyển về trang chủ...</p>
        <div className='flex justify-center mb-4'>
          <div className='w-16 h-16 rounded-full border-4 border-yellow-500 flex items-center justify-center'>
            <span className='text-2xl font-bold text-yellow-500'>{countdown}</span>
          </div>
        </div>
        <div className='flex justify-center'>
          <Link to='/'>
            <button className='px-6 py-2 bg-yellow-500 text-black font-medium rounded-lg hover:bg-yellow-400 transition duration-300'>
              Về trang chủ ngay
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default React.memo(StreamingBasic)
