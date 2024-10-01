import React, { createContext, useState, useContext, useEffect } from 'react'
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
  const [activeEpisode, setActiveEpisode] = useState<string | null>(null)
  const episodes = movieData?.episodes?.[0]?.server_data

  const currentEpisode = React.useMemo(() => {
    if (!episodes || !activeEpisode) return episodes?.[0] || null
    return episodes.find((ep) => ep.name === activeEpisode) || episodes[0]
  }, [episodes, activeEpisode])

  useEffect(() => {
    if (episodes && episodes.length > 0) {
      setActiveEpisode(episodes[0].name)
    }
  }, [episodes])

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
