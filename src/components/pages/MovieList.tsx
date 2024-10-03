import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFilterGenre, useFilterCountry } from '~/api/filter/use-filter'
import { useMovies } from '~/api/movie/use-movies'
import Breadcrumb from '~/components/Breadcrumb'
import FilterPanel from '~/components/FilterPanel'
import MediaList from '~/components/media-list/MediaList'
import Pagination from '~/components/Pagination'
import Sidebar from '~/components/sidebar/Sidebar'
import { sortOptions, typeData, yearOptions } from '~/constant/constant'
import { IFilterCountryItem, IFilterGenreItem } from '~/types/filter/filter-types'

const MovieList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { type } = useParams<{ type: string }>()
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({})
  const [tempFilters, setTempFilters] = useState<Record<string, string>>({})

  const shortType = type?.split('-')[1] || ''
  const {
    data: movieData,
    isLoading,
    isFetching
  } = useMovies({ type: shortType, page: currentPage, ...selectedFilters })
  const { data: genreData } = useFilterGenre()
  const { data: countryData } = useFilterCountry()

  const genres: IFilterGenreItem[] = useMemo(() => genreData?.items || [], [genreData])
  const countries: IFilterCountryItem[] = useMemo(() => countryData?.items || [], [countryData])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

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
    setCurrentPage(1)
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [currentPage, selectedFilters])

  return (
    <div className='text-slate-200 flex flex-col'>
      <div className='mb-4'>
        <FilterPanel
          filtersPanel={filtersPanel}
          tempFilters={tempFilters}
          handleFilterChange={handleFilterChange}
          handleApplyFilters={handleApplyFilters}
        />
        <Breadcrumb breadCrumb={movieData?.breadCrumb || []} />
      </div>

      <div className='flex flex-col lg:flex-row gap-5 -mt-7'>
        <div className='w-full flex-[2.4]'>
          <MediaList
            title={`Phim ${shortType}`}
            filters={selectedFilters}
            isLoading={isLoading || isFetching}
            currentPage={currentPage}
          />
        </div>
        <div className='w-full flex-1'>
          <Sidebar />
        </div>
      </div>

      <div>
        <Pagination
          {...(movieData?.params?.pagination || {
            totalItems: 0,
            totalItemsPerPage: 0,
            currentPage: 0,
            pageRanges: 0
          })}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default React.memo(MovieList)
