import { Outlet } from 'react-router-dom'
import Header from '~/components/layout/Header'

const AppLayout = () => {
  return (
    <div>
      <Header />
      <div className='bg-[#121a2b] pt-20'>
        <div className='min-h-screen container'>
          <Outlet />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default AppLayout
