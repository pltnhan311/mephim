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

const MediaList = ({
  title,
  type,
  swiper,
  category,
  filters
}: {
  title: string
  type: string
  swiper?: boolean
  category?: string
  filters?: Record<string, string>
}) => {
  // const [activeTabId, setActiveTabId] = useState(tabs[0]?.id)
  console.log(filters)
  const { data: movieData } = useMovies({
    type,
    category: filters?.category,
    country: filters?.country,
    year: filters?.year,
    sort_field: filters?.sort_field,
    page: Number(filters?.page)
  })
  const { data: tvShowData } = useTvShows(type)

  const data = category ? tvShowData : movieData

  const mediaList: MovieItem[] = useMemo(() => data?.items.slice(0, 12) || [], [data])

  // useEffect(() => {
  //   const fetchMediaList = async () => {
  //     try {
  //       const url = tabs.find((tab) => tab.id === activeTabId)?.url
  //       const response = await api.get(url)
  //       if (response) {
  //         setMediaList(response.data.results.slice(3, 15))
  //       }
  //     } catch (error) {
  //       console.error('Error fetching media', error)
  //     }
  //   }

  //   fetchMediaList()
  // }, [activeTabId, tabs])

  return (
    <div className='mt-10 px-5 text-[1vw] text-white'>
      {/* <div>
        <p className='font-extrabold capitalize whitespace-nowrap tracking-tight'>
          <span className='bg-gradient-to-r from-orange-400 to-pink-600 bg-clip-text text-transparent'>
            {data?.titlePage}
          </span>
        </p>
      </div> */}
      <div className='!border-b !border-[#1e2732] mb-3'>
        <button className='mb-1 flex flex-col sm:flex-row sm:items-center sm:justify-between'>
          <div className='!border-b !border-[#d5633d] -mb-1'>
            <p className='font-extrabold capitalize whitespace-nowrap tracking-tight'>
              <span className='bg-gradient-to-r from-orange-400 to-pink-600 bg-clip-text text-transparent'>
                {title}
              </span>
            </p>
            {/* <nav className='rounded-full border border-gray-700 bg-blackoil p-1'>
          <ul className='flex'>
            {tabs?.map((tab) => (
              <li key={tab.id} className='m-0.5'>
                <button
                  onClick={() => setActiveTabId(tab.id)}
                  className={`flex items-center justify-center rounded-full px-4 py-1 text-base font-medium transition-all duration-300 ${
                    activeTabId === tab.id
                      ? 'bg-gradient-to-r from-purple-400 to-pink-600 text-white shadow-lg'
                      : 'text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {tab.name}
                </button>
              </li>
            ))}
          </ul>
        </nav> */}
          </div>
        </button>
      </div>

      {!swiper ? (
        <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-3'>
          {mediaList.length === 0
            ? [...Array(12)].map((_, index) => <MovieCardSkeleton key={index} />)
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
          spaceBetween={10}
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
