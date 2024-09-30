import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Outlet } from 'react-router-dom'
import Header from '~/components/layout/Header'

const AppLayout = () => {
  return (
    <div>
      <Header />
      <div className='bg-layout pt-16 text-ghostWhite'>
        <div className='min-h-screen container px-5 py-8 bg-container'>
          <div className='rounded-t transition-all duration-300 ease-in-out hover:shadow-md bg-lightIndigo p-[5px] overflow-hidden text-center s mb-10'>
            <div className='flex items-center justify-center'>
              <FontAwesomeIcon icon={faExclamationTriangle} className='text-yellow-400 mr-3 animate-pulse' />
              <p className='font-semibold text-[13px] text-blackoil'>
                CHÚ Ý: NẾU KHÔNG TẢI ĐƯỢC NỘI DUNG, HÃY BẤM F5 HOẶC BẤM TẢI LẠI TRANG 1 HOẶC 2 LẦN BẠN NHÉ .
              </p>
            </div>
          </div>

          <Outlet />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default AppLayout
