import { useMemo, useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useFilterCountry, useFilterGenre } from '~/api/filter/use-filter'
import MediaList from '~/components/media-list/MediaList'
import Sidebar from '~/components/sidebar/Sidebar'
import { IFilterGenreItem } from '~/types/filter/filter-types'

const MovieList = () => {
  const { type } = useParams<{ type: string }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const shortType = type?.split('-')[1] || ''

  const { data: genreData } = useFilterGenre()
  const { data: countryData } = useFilterCountry()

  const genres: IFilterGenreItem[] = useMemo(() => genreData?.items || [], [genreData])
  const countries: IFilterGenreItem[] = useMemo(() => countryData?.items || [], [countryData])

  const filtersPanel = useMemo(() => {
    return [
      {
        title: 'Thể loại',
        key: 'category',
        items: genres
      },
      {
        title: 'Quốc gia',
        key: 'country',
        items: countries
      }
    ]
  }, [genres, countries])

  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({})

  // Parse query parameters on component mount and when location changes
  useEffect(() => {
    const filters: Record<string, string> = {}
    for (const [key, value] of searchParams.entries()) {
      if (key === 'category' || key === 'country') {
        filters[key] = value
      }
    }
    setSelectedFilters(filters)
  }, [searchParams])

  const handleFilterChange = (key: string, value: string) => {
    setSelectedFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleApplyFilters = () => {
    const newSearchParams = new URLSearchParams(searchParams)
    Object.entries(selectedFilters).forEach(([key, value]) => {
      if (value) {
        newSearchParams.set(key, value)
      } else {
        newSearchParams.delete(key)
      }
    })
    newSearchParams.set('year', '')
    newSearchParams.set('sort_field', '')
    newSearchParams.set('page', '1')

    setSearchParams(newSearchParams)
  }

  return (
    <div className='text-white flex flex-col'>
      <div className='p-4 shadow-sm mb-4'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-2xl font-bold text-white'>{type}</h2>
        </div>
        <div className='flex flex-wrap gap-4 max-w-[1200px]'>
          {filtersPanel?.map((filter) => (
            <div key={filter.title} className='flex flex-col flex-grow'>
              <select
                className='bg-[#2c3a57] text-white p-2 rounded-md transition-colors duration-300 hover:bg-[#3b4a6b]'
                onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                value={selectedFilters[filter.key] || ''}
              >
                <option value=''>{filter.title}</option>
                {filter?.items?.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <button
            className='bg-gradient-to-r from-orange-400 to-pink-600 text-white p-2 rounded-md flex-grow-[0.5] transition-colors duration-300 hover:from-orange-500 hover:to-pink-700'
            onClick={handleApplyFilters}
          >
            Lọc phim
          </button>
        </div>
      </div>

      <div className='flex'>
        <div className='w-full flex-[2.5] flex-shrink-0'>
          <MediaList
            title={`Phim ${shortType}`}
            type={shortType as string}
            // filters={selectedFilters}
          />
        </div>
        <div className='w-full flex-1'>
          <Sidebar />
        </div>
      </div>
    </div>
  )
}

export default MovieList
