import { useState, useEffect } from 'react'
import { faBell, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
// import SearchBar from './SearchBar/SearchBar'

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link to={to} className='transition-colors hover:text-[#9aff3c] duration-200'>
    {children}
  </Link>
)

const IconButton = ({ icon }: { icon: IconDefinition }) => (
  <FontAwesomeIcon icon={icon} className='cursor-pointer text-xl text-gray-200 transition-colors hover:text-white' />
)

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { to: '/', label: 'Trang chủ' },
    { to: '/list/phim-le', label: 'Phim lẻ' },
    { to: '/list/phim-bo', label: 'Phim bộ' },
    { to: '/list/tv-shows', label: 'TV Shows' },
    { to: '/list/hoat-hinh', label: 'Hoạt hình' },
    { to: '/list/the-loai', label: 'Thể loại' },
    { to: '/list/quoc-gia', label: 'Quốc gia' }
  ]

  const userMenuItems = [
    { to: '/profile', label: 'Profile' },
    { to: '/settings', label: 'Settings' },
    { to: '/logout', label: 'Log out' }
  ]

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 bg-[#121a2b] shadow-lg ${
        isScrolled
          ? 'bg-[#141414]/90 backdrop-blur-sm bg-gradient-to-r from-black/70 to-transparent'
          : 'bg-gradient-to-r from-black/70 to-transparent'
      }`}
    >
      <div className='mx-auto flex h-20 max-w-full items-center justify-between px-6 sm:px-8 lg:px-12 '>
        <div className='flex items-center space-x-6 lg:space-x-8'>
          <Link to='/'>
            <img className='w-28 sm:w-32' src='/netflix.png' alt='Netflix' />
          </Link>
          <nav className='hidden space-x-5 text-base text-gray-200 lg:flex capitalize'>
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className='flex items-center space-x-6'>
          {/* <SearchBar /> */}
          <IconButton icon={faBell} />
          <div className='group relative cursor-pointer'>
            <FontAwesomeIcon icon={faUser} className='text-xl text-gray-200 transition-colors group-hover:text-white' />
            <div className='absolute right-0 mt-2 hidden w-48 rounded-md bg-[#141414] py-2 shadow-lg group-hover:block'>
              {userMenuItems.map((item) => (
                <Link key={item.to} to={item.to} className='block px-4 py-2 text-sm text-gray-200 hover:bg-gray-800'>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
