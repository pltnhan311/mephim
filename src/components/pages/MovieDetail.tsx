import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useMovie } from '~/api/movie/use-movie'
import Breadcrumb from '~/components/Breadcrumb'
import Sidebar from '~/components/sidebar/Sidebar'
import { MovieDetailSlug } from '~/types/movie/movie-types'
import Loading from '~/components/Loading'
import MoviePoster from '~/components/movie-detail/MoviePoster'
import MovieInfo from '~/components/movie-detail/MovieInfo'
import TrailerButton from '~/components/movie-detail/TrailerButton'
import { faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MovieEpisode from '~/components/movie-detail/MovieEpisode'
import { useEpisodeContext } from '~/context/EpisodeProvider'

const MovieDetail = () => {
  const { movieSlug } = useParams()
  const { data, isLoading } = useMovie(movieSlug as string)
  const movieData: MovieDetailSlug = useMemo(() => data?.item as MovieDetailSlug, [data])

  const { activeEpisode, setActiveEpisode } = useEpisodeContext()

  if (isLoading) return <Loading />

  return (
    <div className='bg-gray-900 text-white'>
      <div className='px-4 py-8'>
        <Breadcrumb breadCrumb={data?.breadCrumb || []} />

        <div className='flex flex-col xl:flex-row'>
          <div className='w-full flex-[2.4]'>
            <div className='mt-8 flex flex-col md:flex-row gap-8'>
              <MoviePoster movieData={movieData} />
              <div className='md:w-2/3'>
                <MovieInfo movieData={movieData} />
                <TrailerButton trailerUrl={movieData?.trailer_url} />
              </div>
            </div>
            <MovieEpisode
              movieData={movieData}
              activeEpisode={activeEpisode || '1'}
              setActiveEpisode={setActiveEpisode}
            />
            <div className='mt-5 text-amber-400 text-sm flex items-center gap-3 bg-[#224361] p-3 py-4 border-gray-700 mb-3 rounded'>
              <FontAwesomeIcon icon={faWarning} />
              <p>Phim bị lỗi thì bình luận bên dưới để ad fix hoặc qua nhóm tele:...</p>
            </div>

            <div className='bg-gray-800 p-4 rounded-md mt-5'>
              <div className='mb-5 !border-b !border-[#d5633d] w-fit'>
                <p className='font-extrabold capitalize whitespace-nowrap tracking-tight text-lg'>
                  <span className='bg-gradient-to-r from-orange-400 to-pink-600 bg-clip-text text-transparent'>
                    Nội Dung Phim
                  </span>
                </p>
              </div>
              <div>
                <p className='text-[15px] text-slate-400 tracking-wide'>{movieData?.content}</p>
              </div>
            </div>
          </div>

          <div className='w-full flex-[1.1]'>
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail
