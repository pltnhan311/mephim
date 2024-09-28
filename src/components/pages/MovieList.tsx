import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFilterCountry, useFilterGenre } from '~/api/filter/use-filter'
import { useMovies } from '~/api/movie/use-movies'
import Breadcrumb from '~/components/Breadcrumb'
import MediaList from '~/components/media-list/MediaList'
import Sidebar from '~/components/sidebar/Sidebar'
import { sortOptions, typeData, yearOptions } from '~/constant/constant'
import { IFilterGenreItem } from '~/types/filter/filter-types'

const MovieList = () => {
  const { type } = useParams<{ type: string }>()
  // const [searchParams, setSearchParams] = useSearchParams()
  const shortType = type?.split('-')[1] || ''

  const { data: movieData } = useMovies({ type: shortType })
  const { data: genreData } = useFilterGenre()
  const { data: countryData } = useFilterCountry()

  const genres: IFilterGenreItem[] = useMemo(() => genreData?.items || [], [genreData])
  const countries: IFilterGenreItem[] = useMemo(() => countryData?.items || [], [countryData])

  const filtersPanel = useMemo(() => {
    return [
      {
        title: 'Loại phim',
        key: 'type',
        items: typeData
      },
      {
        title: 'Thể loại',
        key: 'category',
        items: genres
      },
      {
        title: 'Quốc gia',
        key: 'country',
        items: countries
      },
      {
        title: 'Năm',
        key: 'year',
        items: yearOptions
      },
      {
        title: 'Sắp xếp',
        key: 'sort_field',
        items: sortOptions
      }
    ]
  }, [genres, countries])

  const [tempFilters, setTempFilters] = useState<Record<string, string>>({})
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({})

  // Parse query parameters on component mount and when location changes
  // useEffect(() => {
  //   const filters: Record<string, string> = {}
  //   for (const [key, value] of searchParams.entries()) {
  //     if (key === 'category' || key === 'country') {
  //       filters[key] = value
  //     }
  //   }
  //   setSelectedFilters(filters)
  // }, [searchParams])

  const handleFilterChange = (key: string, value: string) => {
    setTempFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleApplyFilters = () => {
    setSelectedFilters(tempFilters)
  }

  // const handleApplyFilters = () => {
  //   const newSearchParams = new URLSearchParams(searchParams)
  //   Object.entries(selectedFilters).forEach(([key, value]) => {
  //     if (value) {
  //       newSearchParams.set(key, value)
  //     } else {
  //       newSearchParams.delete(key)
  //     }
  //   })
  //   newSearchParams.set('year', '')
  //   newSearchParams.set('sort_field', '')
  //   newSearchParams.set('page', '1')

  //   setSearchParams(newSearchParams)
  // }

  return (
    <div className='text-slate-200 flex flex-col'>
      <div className='px-4 shadow-sm'>
        {/* Filter */}
        <div className='flex flex-wrap gap-4 max-w-[1200px] mb-8'>
          {filtersPanel?.map((filter) => (
            <div key={filter.title} className='flex flex-col flex-grow'>
              <label className='text-[15px] my-2 font-semibold'>{filter.title}</label>
              <select
                className='bg-[#2c3a57] text-slate-300 p-1 text-sm rounded-md transition-colors duration-300 hover:bg-[#3b4a6b]'
                onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                value={tempFilters[filter.key] || ''}
              >
                <option value=''>- Tất cả -</option>
                {filter?.items?.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <div className='flex-grow-[0.5] flex items-end'>
            <button
              className='bg-gradient-to-r from-orange-400 to-pink-600 text-white p-1 rounded-md flex-grow-[0.5] transition-colors duration-300 hover:from-orange-500 hover:to-pink-700'
              onClick={handleApplyFilters}
            >
              Tìm kiếm
            </button>
          </div>
        </div>

        {/* Breadcrumb */}
        <Breadcrumb breadCrumb={movieData?.breadCrumb || []} />
      </div>

      <div className='flex flex-col lg:flex-row -mt-7'>
        <div className='w-full flex-[2.4]'>
          <MediaList title={`Phim ${shortType}`} type={shortType as string} filters={selectedFilters} />
        </div>
        <div className='w-full flex-1'>
          <Sidebar />
        </div>
      </div>
    </div>
  )
}

export default MovieList
