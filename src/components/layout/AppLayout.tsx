import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Outlet } from 'react-router-dom'
import Header from '~/components/layout/Header'

const AppLayout = () => {
  return (
    <div>
      <Header />
      <div className='bg-[#121a2b] pt-20'>
        <div className='min-h-screen container'>
          <div className='mx-3 border-l-4 mb-8 transition-all duration-300 ease-in-out hover:shadow-md bg-[#fef5c4] border-[1px] border-[#fadf98] p-[5px] overflow-hidden text-center text-[10px] md:text-[11px] lg:text-[13px] leading-[1.6] rounded-t-sm'>
            <div className='flex items-center justify-center'>
              <FontAwesomeIcon icon={faExclamationTriangle} className='text-yellow-500 mr-3 animate-pulse' />
              <p className='text-blackoil/80 font-bold'>
                NẾU KHÔNG TẢI ĐƯỢC NỘI DUNG, HÃY BẤM F5 HOẶC BẤM TẢI LẠI TRANG 1 HOẶC 2 LẦN BẠN NHÉ .
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
