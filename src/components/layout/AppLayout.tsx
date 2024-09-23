import { Outlet } from 'react-router-dom'
import Header from '~/components/layout/Header'

const AppLayout = () => {
  return (
    <div>
      <Header />
      <div className='bg-blackoil pt-24'>
        <div className='min-h-screen container'>
          <Outlet />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default AppLayout
