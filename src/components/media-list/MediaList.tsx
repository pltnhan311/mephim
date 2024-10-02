import { useMemo } from 'react'
import { useMovies } from '~/api/movie/use-movies'
import MovieCard from '~/components/MovieCard'
import { MovieItem } from '~/types/movie/movie-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './style.css'
import { useTvShows } from '~/api/tv-shows/use-tv-shows'
import MovieCardSkeleton from '~/components/MovieCardSkeleton'
import Loading from '~/components/Loading'
import { Link } from 'react-router-dom'

const MediaList = ({
  title,
  movieType,
  tvShowType,
  swiper,
  category,
  filters,
  searchDataList,
  isLoading,
  currentPage
}: {
  title: string
  movieType?: string
  tvShowType?: string
  swiper?: boolean
  category?: string
  filters?: Record<string, string>
  searchDataList?: MovieItem[]
  isLoading?: boolean
  currentPage?: number
}) => {
  // const [activeTabId, setActiveTabId] = useState(tabs[0]?.id)
  const { data: movieData } = useMovies({
    type: movieType || '',
    category: filters?.category,
    country: filters?.country,
    year: filters?.year,
    sort_field: filters?.sort_field,
    page: Number(currentPage)
  })
  const { data: tvShowData } = useTvShows({
    type: tvShowType || '',
    category: filters?.category,
    country: filters?.country,
    year: filters?.year,
    sort_field: filters?.sort_field,
    page: Number(currentPage)
  })

  const data = category || tvShowType ? tvShowData : movieData

  const mediaList: MovieItem[] = useMemo(() => data?.items.slice(0, 200) || [], [data])

  if (isLoading) return <Loading />

  return (
    <div className='mt-10'>
      <div className='!border-b !border-[#1e2732] mb-3 flex justify-between'>
        <div className='mb-1 flex flex-col sm:flex-row sm:items-center sm:justify-between'>
          <div className='!border-b !border-[#d5633d] -mb-1'>
            <p className='font-extrabold capitalize whitespace-nowrap tracking-tight text-lg'>
              <span className='bg-gradient-to-r from-orange-400 to-pink-600 bg-clip-text text-transparent'>
                {title}
              </span>
            </p>
          </div>
        </div>
        <div className='mb-1 flex flex-col sm:flex-row sm:items-center sm:justify-between'>
          <Link to={!data?.type_list.startsWith('phim') ? `/list/phim-${movieType}` : `/list/${tvShowType}`}>
            <div className='bg-gray-600/50 px-10 py-1 rounded-full'>
              <p className='font-medium capitalize whitespace-nowrap tracking-wide'>
                <span className='bg-gradient-to-r from-cyan-500 to-green-400 bg-clip-text text-transparent'>
                  Xem tất cả
                </span>
              </p>
            </div>
          </Link>
        </div>
      </div>

      {!swiper ? (
        <div
          className={`grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-3 ${
            searchDataList ? 'xl:grid-cols-5 2xl:grid-cols-6' : ''
          } `}
        >
          {mediaList.length === 0
            ? [...Array(12)].map((_, index) => <MovieCardSkeleton key={index} />)
            : searchDataList
              ? searchDataList?.map((media) => <MovieCard key={media._id} media={media} />)
              : mediaList?.map((media) => <MovieCard key={media._id} media={media} />)}
        </div>
      ) : (
        <Swiper
          style={
            {
              '--swiper-navigation-color': '#fff',
              '--swiper-navigation-size': '20px',
              '--swiper-pagination-color': '#fff'
            } as React.CSSProperties
          }
          modules={[Navigation, Pagination]}
          spaceBetween={9}
          slidesPerView={6}
          navigation={true}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 10
            },
            640: {
              slidesPerView: 4,
              spaceBetween: 15
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 20
            }
          }}
        >
          {mediaList?.map((media) => (
            <SwiperSlide key={media._id}>
              <MovieCard media={media} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  )
}

export default MediaList
