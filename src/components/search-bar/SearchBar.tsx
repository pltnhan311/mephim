import SearchInput from '~/components/search-bar/SearchInput'
import { useSearchContext } from '~/context/SearchProvider'

const SearchBar = () => {
  const { searchBarRef } = useSearchContext()

  return (
    <div ref={searchBarRef} className='relative'>
      <SearchInput />
    </div>
  )
}

export default SearchBar
