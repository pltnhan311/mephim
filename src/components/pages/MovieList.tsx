import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFilterCountry, useFilterGenre } from '~/api/filter/use-filter'
import MediaList from '~/components/media-list/MediaList'
import Sidebar from '~/components/sidebar/Sidebar'
import { sortOptions, typeData, yearOptions } from '~/constant/constant'
import { IFilterGenreItem } from '~/types/filter/filter-types'

const MovieList = () => {
  const { type } = useParams<{ type: string }>()
  // const [searchParams, setSearchParams] = useSearchParams()
  const shortType = type?.split('-')[1] || ''

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
        key: 'sort',
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

  console.log(yearOptions)

  return (
    <div className='text-white flex flex-col'>
      <div className='p-4 shadow-sm mb-4'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-2xl font-bold text-white'>{type}</h2>
        </div>
        <div className='flex flex-wrap gap-4 max-w-[1200px]'>
          {filtersPanel?.map((filter) => (
            <div key={filter.title} className='flex flex-col flex-grow'>
              <label className='text-lg my-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent font-bold'>
                {filter.title}
              </label>
              <select
                className='bg-[#2c3a57] text-white p-2 rounded-md transition-colors duration-300 hover:bg-[#3b4a6b]'
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
          <div className='flex-grow-[0.5] flex items-end '>
            <button
              className='bg-gradient-to-r from-orange-400 to-pink-600 text-white p-2 rounded-md flex-grow-[0.5] transition-colors duration-300 hover:from-orange-500 hover:to-pink-700'
              onClick={handleApplyFilters}
            >
              Lọc phim
            </button>
          </div>
        </div>
      </div>

      <div className='flex'>
        <div className='w-full flex-[2.5] flex-shrink-0'>
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
