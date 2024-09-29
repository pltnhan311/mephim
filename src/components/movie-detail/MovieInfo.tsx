import { MovieDetailSlug } from '~/types/movie/movie-types'

interface MovieInfoProps {
  movieData: MovieDetailSlug
}

const MovieInfo = ({ movieData }: MovieInfoProps) => (
  <>
    <h1 className='text-3xl font-bold mb-2'>{movieData?.name}</h1>
    <p className='text-lg text-gray-400 mb-4'>{movieData?.origin_name}</p>

    <div className='grid grid-cols-2 gap-x-8 gap-y-2 mb-3 text-sm'>
      <InfoItem label='Năm' value={movieData?.year} />
      <InfoItem label='Thời lượng' value={movieData?.time} />
      <InfoItem label='Đang phát' value={movieData?.episode_current} />
      <InfoItem label='Tập mới nhất' value={movieData?.episode_total} />
      <InfoItem label='Quốc gia' value={movieData?.country?.map((item) => item.name).join(', ')} />
      <InfoItem label='Thể loại' value={movieData?.category?.map((item) => item.name).join(', ')} />
      <InfoItem label='Chất lượng' value={`${movieData?.lang}+${movieData?.quality}`} />
    </div>

    <ActorInfo actors={movieData?.actor} />
    <RatingInfo tmdb={movieData?.tmdb} />
    {movieData?.showtimes && <ShowtimesInfo showtimes={movieData.showtimes} />}
  </>
)

const InfoItem = ({ label, value }: { label: string; value?: string | number }) => (
  <div>
    <span className='text-gray-400'>{label}:</span> <span className='font-semibold'>{value}</span>
  </div>
)

const ActorInfo = ({ actors }: { actors?: string[] }) => (
  <div className='mb-2 max-w-[500px] max-h-[75px] overflow-clip'>
    <h2 className='font-semibold mb-2'>Diễn viên</h2>
    <p className='text-gray-400 text-sm'>{actors?.join(', ')}</p>
  </div>
)

const RatingInfo = ({ tmdb }: { tmdb?: { vote_average: number; vote_count: number } }) => (
  <div className='flex items-center mb-6'>
    <span className='text-yellow-400 text-2xl mr-2'>⭐</span>
    <span className='text-xl font-bold'>{tmdb?.vote_average}</span>
    <span className='text-gray-400 ml-2'>({tmdb?.vote_count} lượt)</span>
  </div>
)

const ShowtimesInfo = ({ showtimes }: { showtimes: string }) => (
  <div className='mb-6'>
    <h2 className='text-xl font-semibold mb-2'>Lịch chiếu</h2>
    <p className='text-gray-300'>{showtimes}</p>
  </div>
)

export default MovieInfo
