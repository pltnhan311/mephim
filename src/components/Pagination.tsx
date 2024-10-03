import React from 'react'
import { Pagination as PaginationType } from '../types/movie/movie-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

interface PaginationProps extends PaginationType {
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  totalItemsPerPage,
  pageRanges,
  currentPage,
  onPageChange
}) => {
  const totalPages = Math.min(Math.ceil(100 / totalItemsPerPage), Math.ceil(totalItems / totalItemsPerPage))
  const pageNumbers = []

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - pageRanges && i <= currentPage + pageRanges)) {
      pageNumbers.push(i)
    } else if (i === currentPage - pageRanges - 1 || i === currentPage + pageRanges + 1) {
      pageNumbers.push('...')
    }
  }

  return (
    <nav className='flex justify-center mt-8' aria-label='Pagination'>
      <ul className='flex items-center space-x-1'>
        <li>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
              currentPage === 1
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
            }`}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FontAwesomeIcon icon={faArrowLeft} className='w-5 h-5' />
          </button>
        </li>
        <div className='px-3 flex items-center gap-2'>
          {pageNumbers.map((number, index) => (
            <li key={index}>
              {number === '...' ? (
                <span className='px-4 py-2 text-gray-400'>...</span>
              ) : (
                <button
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                    currentPage === number ? 'bg-indigo-500 text-white' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  }`}
                  onClick={() => onPageChange(number as number)}
                >
                  {number}
                </button>
              )}
            </li>
          ))}
        </div>
        <li>
          <button
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
              currentPage === totalPages
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
            }`}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FontAwesomeIcon icon={faArrowRight} className='w-5 h-5' />
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default React.memo(Pagination)
