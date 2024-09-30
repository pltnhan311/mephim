import React, { useCallback } from 'react'
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
import { formatTime } from '~/constant/constant'
import { useVideoControls } from '~/custom-hook/use-video-controls'
import screenfull from 'screenfull'

interface VideoPlayerProps {
  url: string
  poster: string
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
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
    handleBackward,
    handleForward,
    showControlsTemporarily,
    setPlaying
  } = useVideoControls()

  const handleVideoClick = (event: React.MouseEvent) => {
    event.preventDefault()
    setPlaying((prev) => !prev)
    showControlsTemporarily()
  }

  const handleToggleFullscreen = useCallback(() => {
    if (playerContainerRef.current && screenfull.isEnabled) {
      screenfull.toggle(playerContainerRef.current)
    }
  }, [playerContainerRef])

  return (
    <div
      ref={playerContainerRef}
      className='relative aspect-video bg-black rounded-lg overflow-hidden shadow-lg'
      onMouseMove={showControlsTemporarily}
      onMouseLeave={showControlsTemporarily}
    >
      <div onClick={handleVideoClick} className='absolute inset-0 z-10' />
      <ReactPlayer
        ref={playerRef}
        url={url}
        width='100%'
        height='100%'
        playing={playing}
        volume={volume}
        muted={muted}
        onProgress={handleProgress}
        onEnded={handleEnded}
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
                  className='hover:text-blue-500'
                  aria-label={playing ? 'Pause' : 'Play'}
                >
                  <FontAwesomeIcon icon={playing ? faPause : faPlay} />
                </button>
                <button onClick={handleBackward} className='hover:text-blue-500' aria-label='Rewind 10 seconds'>
                  <FontAwesomeIcon icon={faBackward} />
                </button>
                <button onClick={handleForward} className='hover:text-blue-500' aria-label='Forward 10 seconds'>
                  <FontAwesomeIcon icon={faForward} />
                </button>
                <div className='flex items-center space-x-2'>
                  <button
                    onClick={handleToggleMute}
                    className='hover:text-blue-500'
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
                className='hover:text-blue-500'
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              >
                <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default VideoPlayer
