import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMovies } from '~/api/movie/use-movies'
import MovieListItem from '~/components/sidebar/MovieListItem'
import { MovieItem } from '~/types/movie/movie-types'

const Sidebar = () => {
  const [activeTabId, setActiveTabId] = useState('week')

  const { data } = useMovies({
    type: 'moi',
    sort_field: activeTabId
  })

  const items: MovieItem[] = useMemo(() => data?.items.slice(0, 12) || [], [data])

  const tabs = [
    { id: 'week', name: 'Tuần' },
    { id: 'month', name: 'Tháng' },
    { id: 'year', name: 'Năm' }
  ]

  return (
    <div className='mt-10 px-5 text-[1vw] text-white'>
      <div className='flex justify-between'>
        <div className='!border-b !border-[#1e2732] mb-3'>
          <button className='mb-1 flex flex-col sm:flex-row sm:items-center sm:justify-between'>
            <div className='!border-b !border-[#d5633d] -mb-1'>
              <p className='font-extrabold capitalize whitespace-nowrap tracking-tight text-lg'>
                <span className='bg-gradient-to-r from-orange-400 to-pink-600 bg-clip-text text-transparent'>
                  Top Xem Nhiều
                </span>
              </p>
            </div>
          </button>
        </div>

        <ul className='flex'>
          {tabs?.map((tab) => (
            <li key={tab.id} className='m-0.5'>
              <button
                onClick={() => setActiveTabId(tab.id)}
                className={`flex items-center justify-center rounded-sm text-xs px-2 py-1.5 transition-all duration-300 border border-white/10 ${
                  activeTabId === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-green-600 text-white shadow-lg'
                    : 'text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {tab.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className='flex flex-col gap-0.5'>
        {items?.slice(0, 13).map((item) => (
          <Link
            key={item._id}
            to={`/movie/${item._id}`}
            className='block rounded-lg transition-colors duration-300 hover:bg-slate-700/50'
          >
            <MovieListItem key={item._id} item={item} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
