import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'
import SearchResult from '~/components/search-bar/SearchResult'
import { useSearchContext } from '~/context/SearchProvider'

const SearchInput = () => {
  const { isOpen, searchKeyword, onInputChange, onToggle, onClear, onSearch } = useSearchContext()
  return (
    <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'w-96' : 'w-10'}`}>
      <div className='relative flex items-center'>
        <input
          type='text'
          value={searchKeyword}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder='Tìm kiếm tên phim, tv shows...'
          className={`w-full rounded border border-gray-700 bg-blackoil/70 p-2 px-10 text-slate-200 placeholder-gray-400 outline-none transition-all duration-300 ${
            isOpen ? 'opacity-80' : 'opacity-0'
          }`}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSearch(searchKeyword)
            }
          }}
        />
        <button onClick={onToggle} className='absolute left-2 text-lightGhostWhite transition-colors hover:text-white'>
          <FontAwesomeIcon icon={faMagnifyingGlass} className='text-xl' />
        </button>
        {isOpen && searchKeyword && (
          <button onClick={onClear} className='absolute right-2 text-gray-400 transition-colors hover:text-white'>
            <FontAwesomeIcon icon={faXmark} className='text-xl' />
          </button>
        )}
      </div>
      {searchKeyword && <SearchResult />}
    </div>
  )
}

export default SearchInput
