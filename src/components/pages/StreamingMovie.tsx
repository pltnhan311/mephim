import React, { useMemo, useCallback, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlay,
  faPause,
  faVolumeUp,
  faVolumeMute,
  faExpand,
  faCompress,
  faBackward,
  faForward,
  faExclamationTriangle,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons'
import { useMovie } from '~/api/movie/use-movie'
import Breadcrumb from '~/components/Breadcrumb'
import Loading from '~/components/Loading'
import Sidebar from '~/components/sidebar/Sidebar'
import { MovieDetailSlug } from '~/types/movie/movie-types'
import { APP_DOMAIN_CDN_IMAGE, formatTime } from '~/constant/constant'
import { useVideoControls } from '~/custom-hook/use-video-controls'
import MovieContent from '~/components/movie-detail/MovieContent'
import MovieEpisode from '~/components/movie-detail/MovieEpisode'
import { useEpisodeContext } from '~/context/EpisodeProvider'
import MediaList from '~/components/media-list/MediaList'

const StreamingMovie: React.FC = () => {
  const { movieSlug } = useParams<{ movieSlug: string }>()
  const { data, isLoading } = useMovie(movieSlug || '')
  const movieData: MovieDetailSlug = useMemo(() => data?.item as MovieDetailSlug, [data])

  const {
    playing,
    volume,
    muted,
    played,
    isFullscreen,
    showControls,
    playerRef,
    playerContainerRef,
    handlePlayPause,
    handleVolumeChange,
    handleToggleMute,
    handleSeekMouseDown,
    handleSeekChange,
    handleSeekMouseUp,
    handleProgress,
    handleEnded,
    handleToggleFullscreen,
    handleBackward,
    handleForward,
    showControlsTemporarily,
    setPlaying
  } = useVideoControls()

  const [showVideo, setShowVideo] = useState(false)
  const [showContent, setShowContent] = useState(false)

  const handlePlayClick = useCallback(() => setShowVideo(true), [])

  const { activeEpisode, setActiveEpisode, currentEpisode } = useEpisodeContext()

  const handleVideoClick = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault()
      setPlaying((prev) => !prev)
      showControlsTemporarily()
    },
    [setPlaying, showControlsTemporarily]
  )

  if (isLoading) return <Loading />
  if (!movieData || !movieData?.episodes || !movieData?.episodes?.[0]?.server_data?.[0]?.link_m3u8) {
    return (
      <div className='flex flex-col items-center justify-center bg-gray-900'>
        <div className='text-4xl text-yellow-500 mb-4'>
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </div>
        <h2 className='text-2xl font-bold text-yellow-500 mb-2'>Rất tiếc, phim này hiện chưa có link xem 😭</h2>
        <p className='text-gray-400 mb-4'>Mong bạn thông cảm. Mời bạn xem phim khác.</p>
        <Link to='/'>
          <button className='px-4 py-2 bg-gray-600/50 text-white rounded hover:bg-gray-600/70 transition duration-300'>
            Xem phim khác
          </button>
        </Link>
      </div>
    )
  }

  return (
    <div className='bg-gray-900 text-white min-h-screen'>
      <div className='container mx-auto px-4 py-8'>
        <Breadcrumb breadCrumb={data?.breadCrumb || []} />

        <div className='flex flex-col xl:flex-row gap-8 mt-2'>
          <div className='w-full xl:w-[70%] mt-10'>
            <div
              ref={playerContainerRef}
              className='relative aspect-video bg-black rounded-lg overflow-hidden shadow-lg'
              onMouseMove={showControlsTemporarily}
              onMouseLeave={showControlsTemporarily}
            >
              {!showVideo ? (
                <div
                  className='relative w-full h-full bg-cover bg-center'
                  style={{
                    backgroundImage: `url(${APP_DOMAIN_CDN_IMAGE}/uploads/movies/${movieData?.poster_url || movieData?.thumb_url})`
                  }}
                >
                  <div className='absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center'>
                    <div className='group relative'>
                      <button
                        onClick={handlePlayClick}
                        className='relative flex items-center justify-center w-16 h-16 bg-orange-500 bg-opacity-80 rounded-full transition-all duration-300 ease-in-out group-hover:bg-opacity-70 group-hover:scale-110'
                        aria-label='Play video'
                      >
                        <FontAwesomeIcon
                          icon={faPlay}
                          className='text-white text-2xl group-hover:scale-110 transition-transform duration-300'
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div onClick={handleVideoClick} className='absolute inset-0 z-10' />
                  <ReactPlayer
                    ref={playerRef}
                    url={currentEpisode?.link_m3u8}
                    width='100%'
                    height='100%'
                    playing={playing}
                    volume={volume}
                    muted={muted}
                    onProgress={handleProgress}
                    onEnded={handleEnded}
                    config={{
                      file: {
                        forceHLS: true
                      }
                    }}
                  />
                  {showControls && (
                    <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 z-20'>
                      <div className='flex flex-col space-y-2'>
                        <input
                          type='range'
                          min={0}
                          max={0.999999}
                          step='any'
                          value={played}
                          onMouseDown={handleSeekMouseDown}
                          onChange={handleSeekChange}
                          onMouseUp={handleSeekMouseUp}
                          className='w-full'
                          aria-label='Seek'
                        />
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center space-x-4'>
                            <button
                              onClick={handlePlayPause}
                              className='text-white hover:text-blue-500'
                              aria-label={playing ? 'Pause' : 'Play'}
                            >
                              <FontAwesomeIcon icon={playing ? faPause : faPlay} />
                            </button>
                            <button
                              onClick={handleBackward}
                              className='text-white hover:text-blue-500'
                              aria-label='Rewind 10 seconds'
                            >
                              <FontAwesomeIcon icon={faBackward} />
                            </button>
                            <button
                              onClick={handleForward}
                              className='text-white hover:text-blue-500'
                              aria-label='Forward 10 seconds'
                            >
                              <FontAwesomeIcon icon={faForward} />
                            </button>
                            <div className='flex items-center space-x-2'>
                              <button
                                onClick={handleToggleMute}
                                className='text-white hover:text-blue-500'
                                aria-label={muted ? 'Unmute' : 'Mute'}
                              >
                                <FontAwesomeIcon icon={muted ? faVolumeMute : faVolumeUp} />
                              </button>
                              <input
                                type='range'
                                min={0}
                                max={1}
                                step='any'
                                value={volume}
                                onChange={handleVolumeChange}
                                className='w-20'
                                aria-label='Volume'
                              />
                            </div>
                            <span className='text-sm'>
                              {formatTime(played * (playerRef.current?.getDuration() || 0))} /
                              {formatTime(playerRef.current?.getDuration() || 0)}
                            </span>
                          </div>
                          <button
                            onClick={handleToggleFullscreen}
                            className='text-white hover:text-blue-500'
                            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                          >
                            <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className='mt-6 bg-gray-800 p-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl'>
              <div className='mb-4 gap-3'>
                <h2 className='text-xl font-semibold text-amber-500 capitalize'>{movieData?.name}</h2>
                <p className='text-sm text-gray-400 mt-1'>
                  {movieData?.episode_current} | {movieData?.quality} + {movieData?.lang}
                </p>
              </div>
              <div className='border-t border-gray-700 pt-2'>
                <button
                  onClick={() => setShowContent((prev) => !prev)}
                  className='flex items-center justify-between w-full text-gray-300 hover:text-amber-500 transition-colors duration-300'
                >
                  <span className='font-light'>Nội dung phim</span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`transform transition-transform duration-200 ${showContent ? 'rotate-180' : ''}`}
                  />
                </button>
                {showContent && (
                  <div className='mt-3 text-gray-400 animate-fadeIn'>
                    <MovieContent movieData={movieData} />
                  </div>
                )}
              </div>
            </div>
            <MovieEpisode
              movieData={movieData}
              activeEpisode={activeEpisode || movieData?.episodes?.[0]?.server_data?.[0]?.name}
              setActiveEpisode={setActiveEpisode}
            />

            <div className='-mx-4'>
              <MediaList title='Có thể bạn sẽ thích' type='tv-shows' category='tv-shows' />
            </div>
          </div>
          <div className='w-full xl:w-[30%] -mt-10'>
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(StreamingMovie)
