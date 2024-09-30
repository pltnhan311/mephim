import React, { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFilterGenre, useFilterCountry } from '~/api/filter/use-filter'
import { useMovies } from '~/api/movie/use-movies'
import Breadcrumb from '~/components/Breadcrumb'
import FilterPanel from '~/components/FilterPanel'
import MediaList from '~/components/media-list/MediaList'
import Sidebar from '~/components/sidebar/Sidebar'
import { sortOptions, typeData, yearOptions } from '~/constant/constant'
import { IFilterCountryItem, IFilterGenreItem } from '~/types/filter/filter-types'

const MovieList: React.FC = () => {
  const { type } = useParams<{ type: string }>()
  const shortType = type?.split('-')[1] || ''
  const { data: movieData } = useMovies({ type: shortType })
  const { data: genreData } = useFilterGenre()
  const { data: countryData } = useFilterCountry()

  const [tempFilters, setTempFilters] = useState<Record<string, string>>({})
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({})

  const genres: IFilterGenreItem[] = useMemo(() => genreData?.items || [], [genreData])
  const countries: IFilterCountryItem[] = useMemo(() => countryData?.items || [], [countryData])

  const filtersPanel = useMemo(() => {
    return [
      { title: 'Loại phim', key: 'type', items: typeData },
      { title: 'Thể loại', key: 'category', items: genres },
      { title: 'Quốc gia', key: 'country', items: countries },
      { title: 'Năm', key: 'year', items: yearOptions },
      { title: 'Sắp xếp', key: 'sort_field', items: sortOptions }
    ]
  }, [genres, countries])

  const handleFilterChange = (key: string, value: string) => {
    setTempFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleApplyFilters = () => {
    setSelectedFilters(tempFilters)
  }

  return (
    <div className='text-slate-200 flex flex-col'>
      <div className='px-4 shadow-sm'>
        <FilterPanel
          filtersPanel={filtersPanel}
          tempFilters={tempFilters}
          handleFilterChange={handleFilterChange}
          handleApplyFilters={handleApplyFilters}
        />
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

export default React.memo(MovieList)
