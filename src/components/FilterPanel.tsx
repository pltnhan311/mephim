import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { IFilterGenreItem } from '~/types/filter/filter-types'

interface FilterPanelProps {
  filtersPanel: Array<{
    title: string
    key: string
    items: IFilterGenreItem[]
  }>
  tempFilters: Record<string, string>
  handleFilterChange: (key: string, value: string) => void
  handleApplyFilters: () => void
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filtersPanel,
  tempFilters,
  handleFilterChange,
  handleApplyFilters
}) => (
  <div className='flex flex-wrap justify-center gap-4 max-w-[1200px] mb-8'>
    {filtersPanel?.map((filter) => (
      <div key={filter.key} className='flex flex-col flex-grow'>
        <label className='text-[15px] my-2 font-semibold'>{filter.title}</label>
        <select
          className='bg-[#29293e] text-slate-300 p-2 text-sm rounded-md transition-colors duration-300 hover:bg-[#25253e]'
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
    <div className='flex-grow flex items-end'>
      <button
        className='bg-gradient-to-r from-orange-400 to-pink-500 text-white p-1.5 rounded-md flex-grow-[0.5] transition-colors duration-300 hover:from-orange-500 hover:to-pink-600'
        onClick={handleApplyFilters}
      >
        <FontAwesomeIcon icon={faFilter} size='lg' />
      </button>
    </div>
  </div>
)

export default React.memo(FilterPanel)
