import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

interface NavItem {
  to: string
  label: string
  icon: IconDefinition
}

interface NavbarProps {
  isOpen: boolean
  onClose: () => void
  navItems: NavItem[]
  userMenuItems: NavItem[]
}

const Navbar: React.FC<NavbarProps> = ({ isOpen, onClose, navItems, userMenuItems }) => {
  const location = useLocation()

  const NavbarVariants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: '-100%', transition: { type: 'spring', stiffness: 300, damping: 30 } }
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <>
      {isOpen && <div className='fixed inset-0 bg-black bg-opacity-50 z-[9998]' onClick={onClose}></div>}
      <motion.div
        initial='closed'
        animate={isOpen ? 'open' : 'closed'}
        variants={NavbarVariants}
        className='fixed top-0 left-0 h-full w-72 bg-container/95 shadow-lg z-[9999] overflow-y-auto'
      >
        <div className='p-6'>
          <button className='text-gray-400 hover:text-white transition-colors absolute top-4 right-4' onClick={onClose}>
            <FontAwesomeIcon icon={faClose} size='lg' />
          </button>
          <nav className='mt-8 space-y-2'>
            {navItems.map((item) => (
              <motion.div key={item.to} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to={item.to}
                  className={`flex items-center py-2 px-4 rounded-lg text-base  transition-all duration-200 ${
                    isActive(item.to)
                      ? 'bg-basicLime/70 text-gray-900'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                  onClick={onClose}
                >
                  <FontAwesomeIcon icon={item.icon} className='mr-3 w-5' />
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>
          <div className='mt-8 border-t border-gray-700 pt-6'>
            <p className='text-gray-400 text-sm font-semibold mb-4 px-4'>User Menu</p>
            {userMenuItems.map((item) => (
              <motion.div key={item.to} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to={item.to}
                  className={`block py-2 px-4 rounded-lg text-base font-medium transition-all duration-200 ${
                    isActive(item.to) ? 'bg-green-500 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default Navbar
