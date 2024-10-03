import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '~/components/layout/Footer'
import Header from '~/components/layout/Header'
import Navbar from '~/components/layout/Navbar'
import { navItems, userMenuItems } from '~/constant/constant'
// Import necessary icons and navItems

const AppLayout = () => {
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [location.pathname])

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className='relative'>
      <Header onMenuClick={toggleSidebar} />
      <Navbar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        navItems={navItems}
        userMenuItems={userMenuItems}
      />
      <div className='bg-layout pt-16 text-ghostWhite min-h-screen'>
        <div className='container bg-container'>
          <div className='rounded-t transition-all duration-300 ease-in-out hover:shadow-md bg-gray-700/50 p-[5px] sm:p-2 overflow-hidden text-center s mb-10'>
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
