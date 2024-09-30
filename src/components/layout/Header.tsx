import { useState, useRef } from 'react'
import { faChevronDown, faChevronUp, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { useFilterCountry, useFilterGenre } from '~/api/filter/use-filter'
import SearchBar from '~/components/search-bar/SearchBar'
import { motion, AnimatePresence } from 'framer-motion'

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link to={to} className='transition-colors hover:text-[#9aff3c] duration-300'>
    {children}
  </Link>
)

const Header = () => {
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'genre' | 'country'>('genre')
  const { data: genre } = useFilterGenre()
  const { data: country } = useFilterCountry()
  const genreButtonRef = useRef<HTMLButtonElement>(null)
  const countryButtonRef = useRef<HTMLButtonElement>(null)

  console.log(genre)
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

  const handleModalToggle = (type: 'genre' | 'country') => {
    setModalType(type)
    setShowModal(!showModal)
  }

  return (
    <header className='fixed top-0 z-50 w-full transition-all duration-300 shadow-lg bg-container/90 backdrop-blur-sm bg-gradient-to-r from-black/70 to-transparent'>
      <div className='mx-auto flex h-16 max-w-full items-center justify-between px-6 sm:px-8 lg:px-16 '>
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
          <SearchBar />
          <div className='group relative cursor-pointer'>
            <FontAwesomeIcon icon={faUser} className='text-xl text-gray-200 transition-colors group-hover:text-white' />
            <div className='absolute right-0 mt-2 hidden w-48 rounded-md bg-container py-2 shadow-lg group-hover:block'>
              {userMenuItems.map((item) => (
                <Link key={item.to} to={item.to} className='block px-4 py-2 text-sm text-gray-200 hover:bg-gray-800'>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

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
                    onClick={() => setShowModal(false)}
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
