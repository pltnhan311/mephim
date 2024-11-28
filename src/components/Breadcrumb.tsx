import { faChevronRight, faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'
import { BreadCrumb } from '~/types/movie/movie-types'

const Breadcrumb = ({ breadCrumb }: { breadCrumb: BreadCrumb[] }) => {
  return (
    <div className='flex items-center space-x-2 text-xs sm:text-sm px-1'>
      <NavLink to='/' className='text-gray-400 hover:text-white transition-colors duration-300'>
        <FontAwesomeIcon icon={faHome} className='mr-1' />
        Trang chủ
      </NavLink>
      {/* Limit to 3 items after Home, for a total of 4 */}
      {breadCrumb?.slice(0, 3).map((item, index) => (
        <div key={`${item._id}-${index}`} className='flex items-center'>
          <FontAwesomeIcon icon={faChevronRight} className='text-gray-500 mx-2' />
          <p
            // to={`/${item.slug}`}
            className={`${
              index === Math.min(breadCrumb.length - 1, 2) ? 'text-orange-400' : 'text-gray-400 hover:text-white'
            } transition-colors duration-300`}
          >
            {item.name}
          </p>
        </div>
      ))}
      {/* Show ellipsis if there are more than 3 items */}
      {breadCrumb.length > 3 && (
        <div className='flex items-center'>
          <FontAwesomeIcon icon={faChevronRight} className='text-gray-500 mx-2' />
          <span className='text-gray-400'>...</span>
        </div>
      )}
    </div>
  )
}

export default Breadcrumb
