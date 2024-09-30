import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { useMovie } from '~/api/movie/use-movie'
import Breadcrumb from '~/components/Breadcrumb'
import Loading from '~/components/Loading'
import Sidebar from '~/components/sidebar/Sidebar'
import { MovieDetailSlug } from '~/types/movie/movie-types'
import { APP_DOMAIN_CDN_IMAGE, stripHtmlTags } from '~/constant/constant'

const StreamingBasic = () => {
  const { movieSlug } = useParams()
  const { data, isLoading } = useMovie(movieSlug as string)
  const movieData: MovieDetailSlug = useMemo(() => data?.item as MovieDetailSlug, [data])
  const [showFullContent, setShowFullContent] = useState(false)
  const contentPreviewLength = 200
  const [showVideo, setShowVideo] = useState(false)

  const episode = movieData?.episodes?.[0]?.server_data?.[0]

  const toggleContent = () => setShowFullContent(!showFullContent)

  const handlePlayClick = () => setShowVideo(true)

  if (isLoading) return <Loading />
  if (!movieData || !movieData?.episodes) {
    return <div className='text-red-500'>Error: Failed to load movie data</div>
  }

  return (
    <div className='bg-gray-900 text-white min-h-screen'>
      <div className='container mx-auto px-4 py-8'>
        <Breadcrumb breadCrumb={data?.breadCrumb || []} />

        <div className='flex flex-col xl:flex-row gap-8 mt-5'>
          <div className='w-full xl:w-[70%] mt-10'>
            <div className='relative aspect-video bg-black/50 rounded-lg overflow-hidden shadow-lg'>
              {!showVideo ? (
                <div
                  className='relative w-full h-full bg-cover bg-center'
                  style={{
                    backgroundImage: `url(${APP_DOMAIN_CDN_IMAGE}/uploads/movies/${movieData?.poster_url || movieData?.thumb_url})`
                  }}
                >
                  <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                    <button
                      onClick={handlePlayClick}
                      className='text-white text-6xl hover:text-blue-400 transition-colors'
                    >
                      ▶
                    </button>
                  </div>
                </div>
              ) : (
                <ReactPlayer
                  url={episode?.link_m3u8}
                  width='100%'
                  height='100%'
                  controls
                  playsinline={true}
                  config={{
                    file: {
                      forceHLS: false,
                      attributes: {
                        controlsList: 'nodownload',
                        playsInline: true
                      }
                    }
                  }}
                />
              )}
            </div>
            <div className='mt-6'>
              <h1 className='text-3xl font-bold mb-2'>{movieData?.name}</h1>
              <p className='text-gray-400 mb-4'>{episode?.filename}</p>
              <div className='text-sm text-gray-300 tracking-wide leading-7 text-pretty font-light'>
                {showFullContent
                  ? stripHtmlTags(movieData?.content)
                  : `${stripHtmlTags(movieData?.content)?.slice(0, contentPreviewLength)}...`}
                {(movieData?.content?.length || 0) > contentPreviewLength && (
                  <button onClick={toggleContent} className='ml-2 text-blue-400 hover:text-blue-300 transition-colors'>
                    {showFullContent ? 'Ẩn bớt' : 'Xem thêm'}
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className='w-full xl:w-[30%] -mt-10'>
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StreamingBasic
