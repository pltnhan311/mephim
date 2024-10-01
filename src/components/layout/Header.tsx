import { useState, useRef, useEffect } from 'react'
import {
  faChevronDown,
  faChevronUp,
  faUser,
  faBars,
  faHome,
  faFilm,
  faTv,
  faTheaterMasks,
  faGlobe,
  faCog,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { useFilterCountry, useFilterGenre } from '~/api/filter/use-filter'
import SearchBar from '~/components/search-bar/SearchBar'
import { motion, AnimatePresence } from 'framer-motion'
import useToggle from '~/custom-hook/use-toggle'
import Sidebar from './Sidebar'

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link to={to} className='transition-colors hover:text-basicLime duration-300'>
    {children}
  </Link>
)

const Header = () => {
  const [showModal, setShowModal] = useToggle(false)
  const [modalType, setModalType] = useState<'genre' | 'country'>('genre')
  const { data: genre } = useFilterGenre()
  const { data: country } = useFilterCountry()
  const genreButtonRef = useRef<HTMLButtonElement>(null)
  const countryButtonRef = useRef<HTMLButtonElement>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useToggle(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  const navItems = [
    { to: '/', label: 'Trang chủ', icon: faHome },
    { to: '/list/phim-le', label: 'Phim lẻ', icon: faFilm },
    { to: '/list/phim-bo', label: 'Phim bộ', icon: faTv },
    { to: '/list/tv-shows', label: 'TV Shows', icon: faTv },
    { to: '/list/hoat-hinh', label: 'Hoạt hình', icon: faTheaterMasks },
    { to: '/list/the-loai', label: 'Thể loại', icon: faFilm },
    { to: '/list/quoc-gia', label: 'Quốc gia', icon: faGlobe }
  ]

  const userMenuItems = [
    { to: '/profile', label: 'Tài khoản', icon: faUser },
    { to: '/settings', label: 'Cài đặt', icon: faCog },
    { to: '/logout', label: 'Đăng xuất', icon: faSignOutAlt }
  ]

  const handleModalToggle = (type: 'genre' | 'country') => {
    setModalType(type)
    setShowModal()
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setIsMobileMenuOpen])

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  return (
    <header className='fixed top-0 z-50 w-full transition-all duration-300 shadow-lg bg-container'>
      <div className='mx-auto flex h-16 max-w-full items-center justify-between px-6 sm:px-8 lg:px-16'>
        <div className='flex items-center space-x-6 lg:space-x-8'>
          <Link to='/'>
            <img className='w-24 sm:w-28' src='/netflix-logo.png' alt='Netflix' />
          </Link>
          <nav className='hidden space-x-5 text-base text-gray-200 lg:flex capitalize'>
            {navItems.map((item) =>
              item.label === 'Thể loại' || item.label === 'Quốc gia' ? (
                <button
                  key={item.to}
                  ref={item.label === 'Thể loại' ? genreButtonRef : countryButtonRef}
                  onClick={() => handleModalToggle(item.label === 'Thể loại' ? 'genre' : 'country')}
                  className='transition-colors hover:text-[#9aff3c] duration-300'
                >
                  {item.label}
                  <FontAwesomeIcon
                    size='sm'
                    icon={
                      showModal && modalType === (item.label === 'Thể loại' ? 'genre' : 'country')
                        ? faChevronUp
                        : faChevronDown
                    }
                    className='ml-2'
                  />
                </button>
              ) : (
                <NavLink key={item.to} to={item.to}>
                  {item.label}
                </NavLink>
              )
            )}
          </nav>
        </div>
        <div className='flex items-center space-x-4'>
          <div className='relative z-[51]'>
            <SearchBar />
          </div>
          <div className='hidden lg:block group relative cursor-pointer'>
            <FontAwesomeIcon icon={faUser} className='text-xl text-gray-200 transition-colors group-hover:text-white' />
            <div className='absolute right-0 mt-2 hidden w-48 rounded-md bg-container py-2 shadow-lg group-hover:block'>
              {userMenuItems.map((item) => (
                <Link key={item.to} to={item.to} className='block px-4 py-2 text-sm text-gray-200 hover:bg-gray-800'>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <button
            className='lg:hidden text-gray-200 hover:text-white transition-colors z-[52]'
            onClick={() => setIsMobileMenuOpen()}
          >
            <FontAwesomeIcon icon={faBars} size='lg' />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial='hidden'
            animate='visible'
            exit='hidden'
            variants={fadeInVariants}
            className='fixed inset-0 bg-black bg-opacity-50 z-[60]'
          >
            <Sidebar
              isOpen={isMobileMenuOpen}
              onClose={setIsMobileMenuOpen}
              navItems={navItems}
              userMenuItems={userMenuItems}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className='mt-5 -ml-1 absolute bg-layout rounded-sm shadow-2xl z-50 w-[400px] overflow-hidden text-sm'
            style={{
              top:
                modalType === 'genre'
                  ? genreButtonRef.current?.offsetTop && genreButtonRef.current?.offsetHeight
                    ? genreButtonRef.current.offsetTop + genreButtonRef.current.offsetHeight
                    : 0
                  : countryButtonRef.current?.offsetTop && countryButtonRef.current?.offsetHeight
                    ? countryButtonRef.current.offsetTop + countryButtonRef.current.offsetHeight
                    : 0,
              left:
                modalType === 'genre'
                  ? genreButtonRef.current?.offsetLeft || 0
                  : countryButtonRef.current?.offsetLeft || 0
            }}
          >
            <div className='p-6 bg-container/90 backdrop-blur-sm '>
              <div className='grid grid-cols-3 gap-4'>
                {(modalType === 'genre' ? genre?.items : country?.items)?.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/${modalType === 'genre' ? 'the-loai' : 'quoc-gia'}/${item.slug}`}
                    className='text-gray-300 hover:text-basicLime transition-colors duration-300 flex items-center space-x-2 font-light'
                    onClick={setShowModal}
                  >
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
