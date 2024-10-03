import FeatureMovie from '~/components/intro/FeatureMovie'
import MediaList from '~/components/media-list/MediaList'
import Sidebar from '~/components/sidebar/Sidebar'

const Home = () => {
  return (
    <div className='bg-container'>
      <FeatureMovie />
      <MediaList title='Phim mới' mediaType='phim-sap-chieu' swiper={true} />
      <div className='flex flex-col lg:flex-row gap-5'>
        <div className='w-full flex-[2]'>
          <MediaList title='Phim lẻ' mediaType='phim-le' />
          <MediaList title='Phim bộ' mediaType='phim-bo' />
          <MediaList title='TV Shows' mediaType='tv-shows' />
          <MediaList title='Hoạt hình' mediaType='hoat-hinh' />
        </div>
        <div className='w-full flex-1'>
          <Sidebar />
        </div>
      </div>
    </div>
  )
}

export default Home
