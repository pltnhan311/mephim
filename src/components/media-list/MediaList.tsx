import { useMemo } from 'react'
import { useMovies } from '~/api/movie/use-movies'
import MovieCard from '~/components/MovieCard'
import { MovieItem } from '~/types/movie/movie-types'

const MediaList = ({ title, type }: { title: string; type: string }) => {
  // const [activeTabId, setActiveTabId] = useState(tabs[0]?.id)

  const { data } = useMovies(type)
  const mediaList: MovieItem[] = useMemo(() => data?.items.slice(0, 12) || [], [data])

  console.log(mediaList)

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
    <div className='mt-10 px-5 text-[1.2vw] text-white bg-blackoil'>
      <div>
        <p className='font-extrabold capitalize whitespace-nowrap tracking-tight'>
          <span className='bg-gradient-to-r from-orange-400 to-pink-600 bg-clip-text text-transparent'>
            {data?.titlePage}
          </span>
        </p>
      </div>
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
      <div className='grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6 lg:gap-3'>
        {/* {mediaList.length === 0
          ? [...Array(12)].map((_, index) => <MovieCardSkeleton key={index} />)
          : mediaList?.map((media) => <MovieCard key={media.id} media={media} activeTabId={activeTabId} />)} */}
        {mediaList?.map((media) => <MovieCard key={media._id} media={media} />)}
      </div>
    </div>
  )
}

export default MediaList
