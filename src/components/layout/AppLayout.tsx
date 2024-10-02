import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '~/components/layout/Footer'
import Header from '~/components/layout/Header'

const AppLayout = () => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [location.pathname])

  return (
    <div>
      <Header />
      <div className='bg-layout pt-16 text-ghostWhite min-h-screen'>
        <div className='container bg-container'>
          <div className='rounded-t transition-all duration-300 ease-in-out hover:shadow-md bg-gray-700 p-[5px] sm:p-2 overflow-hidden text-center s mb-10'>
            <p className='font-semibold sm:stext-[13px] text-xs text-yellow-500'>
              NẾU KHÔNG TẢI ĐƯỢC NỘI DUNG, HÃY BẤM F5 HOẶC TẢI LẠI TRANG 1 HOẶC 2 LẦN BẠN NHÉ .
            </p>
          </div>

          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AppLayout
