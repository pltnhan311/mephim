import { useState, useRef, useCallback, useEffect } from 'react'
import ReactPlayer from 'react-player'
import screenfull from 'screenfull'

export const useVideoControls = () => {
  const [playing, setPlaying] = useState(true)
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)
  const [played, setPlayed] = useState(0)
  const [seeking, setSeeking] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const playerRef = useRef<ReactPlayer>(null)
  const playerContainerRef = useRef<HTMLDivElement>(null)

  const handlePlayPause = useCallback(() => setPlaying((prev) => !prev), [])

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value))
  }, [])

  const handleToggleMute = useCallback(() => setMuted((prev) => !prev), [])

  const handleSeekMouseDown = useCallback(() => setSeeking(true), [])

  const handleSeekChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayed(parseFloat(e.target.value))
  }, [])

  const handleSeekMouseUp = useCallback((e: React.MouseEvent<HTMLInputElement>) => {
    setSeeking(false)
    playerRef.current?.seekTo(parseFloat((e.target as HTMLInputElement).value))
  }, [])

  const handleProgress = useCallback(
    (state: { played: number }) => {
      if (!seeking) {
        setPlayed(state.played)
      }
    },
    [seeking]
  )

  const handleEnded = useCallback(() => setPlaying(false), [])

  const handleToggleFullscreen = useCallback(() => {
    if (playerContainerRef.current && screenfull.isEnabled) {
      screenfull.toggle(playerContainerRef.current)
    }
  }, [])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(screenfull.isFullscreen)
    }

    if (screenfull.isEnabled) {
      screenfull.on('change', handleFullscreenChange)
    }

    return () => {
      if (screenfull.isEnabled) {
        screenfull.off('change', handleFullscreenChange)
      }
    }
  }, [])

  const handleBackward = useCallback(() => {
    const currentTime = playerRef.current?.getCurrentTime() || 0
    playerRef.current?.seekTo(Math.max(currentTime - 10, 0))
  }, [])

  const handleForward = useCallback(() => {
    const currentTime = playerRef.current?.getCurrentTime() || 0
    const duration = playerRef.current?.getDuration() || 0
    playerRef.current?.seekTo(Math.min(currentTime + 10, duration))
  }, [])

  const showControlsTemporarily = useCallback(() => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false)
    }, 3000)
  }, [])

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [])

  return {
    playing,
    volume,
    muted,
    played,
    seeking,
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
  }
}
