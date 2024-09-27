import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
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
  faForward
} from '@fortawesome/free-solid-svg-icons'
import { useMovie } from '~/api/movie/use-movie'
import Breadcrumb from '~/components/Breadcrumb'
import Loading from '~/components/Loading'
import Sidebar from '~/components/sidebar/Sidebar'
import { MovieDetailSlug } from '~/types/movie/movie-types'
import { APP_DOMAIN_CDN_IMAGE, stripHtmlTags } from '~/constant/constant'

const StreamingMovie = () => {
  const { movieSlug } = useParams()
  const { data, isLoading } = useMovie(movieSlug as string)
  const movieData: MovieDetailSlug = useMemo(() => data?.item as MovieDetailSlug, [data])
  const [showFullContent, setShowFullContent] = useState(false)
  const contentPreviewLength = 200
  const [showVideo, setShowVideo] = useState(false)
  const [playing, setPlaying] = useState(true)
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)
  const [played, setPlayed] = useState(0)
  const [seeking, setSeeking] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const playerRef = useRef<ReactPlayer>(null)
  const playerContainerRef = useRef<HTMLDivElement>(null)
  const [showControls, setShowControls] = useState(true)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const episode = movieData?.episodes?.[0]?.server_data?.[0]

  const toggleContent = () => setShowFullContent(!showFullContent)
  const handlePlayClick = () => setShowVideo(true)

  const handlePlayPause = () => setPlaying(!playing)
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value))
  }
  const handleToggleMute = () => setMuted(!muted)
  const handleSeekMouseDown = () => setSeeking(true)
  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayed(parseFloat(e.target.value))
  }
  const handleSeekMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    setSeeking(false)
    playerRef.current?.seekTo(parseFloat((e.target as HTMLInputElement).value))
  }
  const handleProgress = (state: { played: number }) => {
    if (!seeking) {
      setPlayed(state.played)
    }
  }
  const handleEnded = () => setPlaying(false)
  // const handleDuration = (duration: number) => {
  //   // You can use this to set the duration state if needed
  // }
  const handleToggleFullscreen = () => {
    if (!isFullscreen) {
      playerContainerRef.current?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
    setIsFullscreen(!isFullscreen)
  }
  const handleBackward = () => {
    const currentTime = playerRef.current?.getCurrentTime() || 0
    playerRef.current?.seekTo(Math.max(currentTime - 10, 0))
  }
  const handleForward = () => {
    const currentTime = playerRef.current?.getCurrentTime() || 0
    const duration = playerRef.current?.getDuration() || 0
    playerRef.current?.seekTo(Math.min(currentTime + 10, duration))
  }

  const formatTime = (seconds: number) => {
    const date = new Date(seconds * 1000)
    const hh = date.getUTCHours()
    const mm = date.getUTCMinutes()
    const ss = date.getUTCSeconds().toString().padStart(2, '0')
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`
    }
    return `${mm}:${ss}`
  }

  const handleVideoClick = (event: React.MouseEvent) => {
    // Prevent click from reaching the ReactPlayer
    event.preventDefault()
    setPlaying(!playing)
    showControlsTemporarily()
  }

  const showControlsTemporarily = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false)
    }, 3000) // Hide controls after 3 seconds
  }

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [])

  if (isLoading) return <Loading />
  if (!movieData || !movieData?.episodes) {
    return <div className='text-red-500'>Error: Failed to load movie data</div>
  }

  return (
    <div className='bg-gray-900 text-white min-h-screen'>
      <div className='container mx-auto px-4 py-8'>
        <Breadcrumb breadCrumb={data?.breadCrumb || []} />

        <div className='flex flex-col xl:flex-row gap-8 mt-5'>
          <div className='w-full xl:w-[70%] mt-10'>
            <div
              ref={playerContainerRef}
              className='relative aspect-video bg-black rounded-lg overflow-hidden shadow-lg'
              onMouseMove={showControlsTemporarily}
              onMouseLeave={() => setShowControls(false)}
            >
              {!showVideo ? (
                <div
                  className='relative w-full h-full bg-cover bg-center'
                  style={{
                    backgroundImage: `url(${APP_DOMAIN_CDN_IMAGE}/uploads/movies/${movieData?.poster_url || movieData?.thumb_url})`
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
                  <div onClick={handleVideoClick} className='absolute inset-0 z-10' />
                  <ReactPlayer
                    ref={playerRef}
                    url={episode?.link_m3u8}
                    width='100%'
                    height='100%'
                    playing={playing}
                    volume={volume}
                    muted={muted}
                    onProgress={handleProgress}
                    onEnded={handleEnded}
                    // onDuration={handleDuration}
                    config={{
                      file: {
                        forceHLS: true
                      }
                    }}
                  />
                  {showControls && (
                    <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 z-20'>
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
                        />
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center space-x-4'>
                            <button onClick={handlePlayPause} className='text-white hover:text-blue-400'>
                              <FontAwesomeIcon icon={playing ? faPause : faPlay} />
                            </button>
                            <button onClick={handleBackward} className='text-white hover:text-blue-400'>
                              <FontAwesomeIcon icon={faBackward} />
                            </button>
                            <button onClick={handleForward} className='text-white hover:text-blue-400'>
                              <FontAwesomeIcon icon={faForward} />
                            </button>
                            <div className='flex items-center space-x-2'>
                              <button onClick={handleToggleMute} className='text-white hover:text-blue-400'>
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
                              />
                            </div>
                            <span className='text-sm'>
                              {formatTime(played * (playerRef.current?.getDuration() || 0))} /
                              {formatTime(playerRef.current?.getDuration() || 0)}
                            </span>
                          </div>
                          <button onClick={handleToggleFullscreen} className='text-white hover:text-blue-400'>
                            <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className='mt-6'>
              <h1 className='text-3xl font-bold mb-2'>{movieData?.name}</h1>
              <p className='text-gray-400 mb-4'>{episode?.filename}</p>
              <div className='text-sm text-gray-300 tracking-wide leading-7 text-pretty font-light'>
                {showFullContent
                  ? stripHtmlTags(movieData?.content)
                  : `${stripHtmlTags(movieData?.content)?.slice(0, contentPreviewLength)}...`}
                {(movieData?.content?.length || 0) > contentPreviewLength && (
                  <button onClick={toggleContent} className='ml-2 text-blue-400 hover:text-blue-300 transition-colors'>
                    {showFullContent ? 'Ẩn bớt' : 'Xem thêm'}
                  </button>
                )}
              </div>
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

export default StreamingMovie
