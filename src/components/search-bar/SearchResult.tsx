import { Link } from 'react-router-dom'
import { useSearchContext } from '~/context/SearchProvider'
import SearchItemResult from '~/components/search-bar/SearchItemResult'

const SearchResult = () => {
  const { results } = useSearchContext()
  return (
    <div className='absolute z-10 mt-2 max-h-[70vh] w-full overflow-y-auto rounded-lg bg-blackoil shadow-lg'>
      {results?.items?.map((item) => (
        <Link
          key={item._id}
          to={`/chi-tiet/${item.slug}`}
          className='block transition-colors duration-200 hover:bg-slate-600/20'
        >
          <SearchItemResult item={item} />
        </Link>
      ))}
    </div>
  )
}

export default SearchResult
