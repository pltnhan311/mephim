import FeatureMovie from '~/components/intro/FeatureMovie'
import MediaList from '~/components/media-list/MediaList'
import Sidebar from '~/components/sidebar/Sidebar'

const Home = () => {
  return (
    <div className='bg-[#121a2b]'>
      <FeatureMovie />
      <MediaList title='Phim mới' type='sap-chieu' swiper={true} />
      <div className='flex flex-col lg:flex-row'>
        <div className='w-full flex-[2.4]'>
          <MediaList title='Phim lẻ' type='le' />
          <MediaList title='Phim bộ' type='bo' />
          <MediaList title='TV Shows' type='tv-shows' category='tv-shows' />
          <MediaList title='Hoạt hình' type='hoat-hinh' category='hoat-hinh' />
        </div>
        <div className='w-full flex-1'>
          <Sidebar />
        </div>
      </div>
    </div>
  )
}

export default Home
