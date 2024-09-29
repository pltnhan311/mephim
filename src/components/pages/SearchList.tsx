import { useSearchParams } from 'react-router-dom'
import { useSearch } from '~/api/movie/use-search'
import MediaList from '~/components/media-list/MediaList'
const SearchList = () => {
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get('keyword')

  const { data } = useSearch(keyword as string)

  console.log(data)

  console.log('SearchList rendered with keyword:', keyword)

  return (
    <div className=''>
      <MediaList title={data?.titlePage || ''} searchDataList={data?.items} />
    </div>
  )
}

export default SearchList
