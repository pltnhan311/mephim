import React from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useMovie } from '~/api/movie/use-movie'
import Loading from '~/components/Loading'
import { EpisodeProvider } from '~/context/EpisodeProvider'

const MovieLayout: React.FC = () => {
  const { movieSlug } = useParams<{ movieSlug: string }>()
  const { data, isLoading } = useMovie(movieSlug || '')

  if (isLoading) return <Loading />
  if (!data?.item) return <div>Error loading movie data</div>

  return (
    <EpisodeProvider movieData={data.item}>
      <Outlet />
    </EpisodeProvider>
  )
}

export default MovieLayout
