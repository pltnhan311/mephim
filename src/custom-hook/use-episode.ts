import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { MovieDetailSlug } from '~/types/movie/movie-types'

export const useEpisode = (movieData: MovieDetailSlug, movieSlug: string) => {
  const navigate = useNavigate()
  const episodes = useMemo(() => movieData?.episodes?.[0]?.server_data, [movieData])
  const [activeEpisode, setActiveEpisode] = useState('1')

  const handleSetActiveEpisode = (episode: string) => {
    setActiveEpisode(episode)
    navigate(`/xem-phim/${movieSlug}`)
  }

  const currentEpisode = useMemo(() => {
    return episodes?.find((ep) => ep.name === activeEpisode) || episodes?.[0]
  }, [episodes, activeEpisode])

  return {
    episodes,
    activeEpisode,
    setActiveEpisode: handleSetActiveEpisode,
    currentEpisode
  }
}
