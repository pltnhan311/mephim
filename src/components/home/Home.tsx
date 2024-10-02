import FeatureMovie from '~/components/intro/FeatureMovie'
import MediaList from '~/components/media-list/MediaList'
import Sidebar from '~/components/sidebar/Sidebar'

const Home = () => {
  return (
    <div className='bg-container'>
      <FeatureMovie />
      <MediaList title='Phim mới' movieType='sap-chieu' swiper={true} />
      <div className='flex flex-col lg:flex-row gap-5'>
        <div className='w-full flex-[2]'>
          <MediaList title='Phim lẻ' movieType='le' />
          <MediaList title='Phim bộ' movieType='bo' />
          <MediaList title='TV Shows' tvShowType='tv-shows' category='tv-shows' />
          <MediaList title='Hoạt hình' tvShowType='hoat-hinh' category='hoat-hinh' />
        </div>
        <div className='w-full flex-1'>
          <Sidebar />
        </div>
      </div>
    </div>
  )
}

export default Home
