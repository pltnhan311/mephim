import { useParams } from 'react-router-dom'
import { useMovie } from '~/api/movie/use-movie'
import Breadcrumb from '~/components/Breadcrumb'
import Sidebar from '~/components/sidebar/Sidebar'
import Loading from '~/components/Loading'
import MoviePoster from '~/components/movie-detail/MoviePoster'
import MovieInfo from '~/components/movie-detail/MovieInfo'
import TrailerButton from '~/components/movie-detail/TrailerButton'
import { faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MovieEpisode from '~/components/movie-detail/MovieEpisode'
import { useEpisodeContext } from '~/context/EpisodeProvider'
import MediaList from '~/components/media-list/MediaList'
import MovieContent from '~/components/movie-detail/MovieContent'
import useToggle from '~/custom-hook/use-toggle'
import { MovieDetailSlug } from '~/types/movie/movie-types'

const MovieDetail = () => {
  const { movieSlug } = useParams()
  const { data, isLoading } = useMovie(movieSlug || '')
  const [showEpisode, setShowEpisode] = useToggle(false)
  const movieData = data?.item as MovieDetailSlug

  const { activeEpisode, setActiveEpisode } = useEpisodeContext()

  if (isLoading) return <Loading />

  return (
    <div className='px-4 py-8'>
      <Breadcrumb breadCrumb={data?.breadCrumb || []} />

      <div className='flex flex-col xl:flex-row gap-5'>
        <div className='w-full flex-[2]'>
          <div className='mt-8 flex flex-col md:flex-row gap-8'>
            <MoviePoster movieData={movieData} showEpisode={showEpisode} setShowEpisode={setShowEpisode} />
            <div className='md:w-2/3'>
              <MovieInfo movieData={movieData} />
              {movieData?.trailer_url && <TrailerButton trailerUrl={movieData?.trailer_url} />}
            </div>
          </div>
          {showEpisode && (
            <MovieEpisode
              movieData={movieData}
              activeEpisode={activeEpisode || movieData?.episodes?.[0]?.server_data?.[0]?.name}
              setActiveEpisode={setActiveEpisode}
            />
          )}
          <WarningSection message='Phim bị lỗi thì bình luận bên dưới để ad fix hoặc qua nhóm tele:...' />
          <MovieContentSection movieData={movieData} />
          <div className='-mx-4'>
            <MediaList title='Có thể bạn sẽ thích' type='le' />
          </div>
        </div>

        <div className='w-full flex-1'>
          <Sidebar />
        </div>
      </div>
    </div>
  )
}

const MovieContentSection: React.FC<{ movieData: MovieDetailSlug }> = ({ movieData }) => (
  <div className='bg-[#27273e] p-4 rounded-md mt-5'>
    <div className='mb-5 !border-b !border-[#d5633d] w-fit'>
      <p className='font-extrabold capitalize whitespace-nowrap tracking-tight text-lg'>
        <span className='bg-gradient-to-r from-orange-400 to-pink-600 bg-clip-text text-transparent'>
          Nội Dung Phim
        </span>
      </p>
    </div>
    <MovieContent movieData={movieData} />
  </div>
)

const WarningSection = ({ message }: { message: string }) => (
  <div className='mt-5 text-amber-400 text-sm flex items-center gap-3 bg-[#27273e] p-3 py-4 border-gray-700 mb-3 rounded'>
    <FontAwesomeIcon icon={faWarning} />
    <p>{message}</p>
  </div>
)

export default MovieDetail
