import { faChevronRight, faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { BreadCrumb } from '~/types/movie/movie-types'

const Breadcrumb = ({ breadCrumb }: { breadCrumb: BreadCrumb[] }) => {
  return (
    <div className='flex items-center space-x-2 text-sm px-1'>
      <Link to='/' className='text-gray-400 hover:text-white transition-colors duration-300'>
        <FontAwesomeIcon icon={faHome} className='mr-1' />
        Trang chủ
      </Link>
      {breadCrumb?.map((item, index) => (
        <div key={item._id} className='flex items-center'>
          <FontAwesomeIcon icon={faChevronRight} className='text-gray-500 mx-2' />
          <Link
            to={`/${item.slug}`}
            className={`${
              index === breadCrumb.length - 1 ? 'text-orange-400' : 'text-gray-400 hover:text-white'
            } transition-colors duration-300`}
          >
            {item.name}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Breadcrumb
