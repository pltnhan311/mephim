import React, { useMemo } from 'react'
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
import { Link, useParams } from 'react-router-dom'

interface MediaListProps {
  title: string
  mediaType?: string
  swiper?: boolean
  category?: string
  filters?: Record<string, string>
  searchDataList?: MovieItem[]
  isLoading?: boolean
  currentPage?: number
}

const MediaList = ({
  title,
  mediaType,
  swiper,
  category,
  filters,
  searchDataList,
  isLoading,
  currentPage
}: MediaListProps) => {
  const { type } = useParams()
  const { data: movieData } = useMovies({
    type: type || mediaType || '',
    category: filters?.category,
    country: filters?.country,
    year: filters?.year,
    sort_field: filters?.sort_field,
    page: Number(currentPage)
  })
  const { data: tvShowData } = useTvShows({
    type: type || mediaType || '',
    category: filters?.category,
    country: filters?.country,
    year: filters?.year,
    sort_field: filters?.sort_field,
    page: Number(currentPage)
  })

  const data = category ? tvShowData : movieData

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
          <Link to={`/list/${type || mediaType}`}>
            <div className='group relative overflow-hidden bg-gradient-to-r from-orange-500 to-yellow-400/20 px-8 py-1 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-orange-600/30 mb-0.5'>
              <span className='absolute inset-0 bg-white mix-blend-overlay opacity-0 transition-opacity duration-300 group-hover:opacity-20'></span>
              <p className='font-light text-sm capitalize whitespace-nowrap tracking-wide text-white relative z-10'>
                Xem thêm
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

export default React.memo(MediaList)
