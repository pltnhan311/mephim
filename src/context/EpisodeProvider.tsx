import React, { createContext, useState, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Episode, MovieDetailSlug } from '~/types/movie/movie-types'

interface EpisodeContextType {
  activeEpisode: string | null
  setActiveEpisode: (episode: string) => void
  currentEpisode: Episode | null
}

const EpisodeContext = createContext<EpisodeContextType | undefined>(undefined)

export const EpisodeProvider: React.FC<{ children: React.ReactNode; movieData: MovieDetailSlug }> = ({
  children,
  movieData
}) => {
  const location = useLocation()
  const [activeEpisode, setActiveEpisode] = useState<string | null>(null)
  const episodes = movieData?.episodes?.[0]?.server_data

  const currentEpisode = React.useMemo(() => {
    if (!episodes || !activeEpisode) return null
    return episodes.find((ep) => ep.name === activeEpisode) || null
  }, [episodes, activeEpisode])

  useEffect(() => {
    if (location.pathname.includes('chi-tiet')) {
      setActiveEpisode(movieData?.episodes?.[0]?.server_data?.[0]?.name)
    }
  }, [location.pathname, movieData])

  return (
    <EpisodeContext.Provider value={{ activeEpisode, setActiveEpisode, currentEpisode }}>
      {children}
    </EpisodeContext.Provider>
  )
}

export const useEpisodeContext = () => {
  const context = useContext(EpisodeContext)
  if (context === undefined) {
    throw new Error('useEpisodeContext must be used within an EpisodeProvider')
  }
  return context
}
