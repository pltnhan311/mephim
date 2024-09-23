import FeatureMovie from '~/components/intro/FeatureMovie'
import MediaList from '~/components/media-list/MediaList'

const Home = () => {
  return (
    <div className=''>
      <FeatureMovie />
      <MediaList title='Phim mới' type='sap-chieu' />
      <MediaList title='Phim lẻ' type='le' />
      <MediaList title='Phim bộ' type='bo' />
    </div>
  )
}

export default Home
