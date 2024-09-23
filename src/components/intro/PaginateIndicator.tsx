import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { MovieItem } from '~/types/movie/movie-types'

interface PaginateIndicatorProps {
  movies: MovieItem[]
  activeIndex: number
  setActiveIndex: (index: number) => void
}

const PaginateIndicator = ({ movies, activeIndex, setActiveIndex }: PaginateIndicatorProps) => {
  const [currentIndex, setCurrentIndex] = useState(activeIndex)

  useEffect(() => {
    if (!movies || movies.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [movies])

  useEffect(() => {
    setActiveIndex(currentIndex)
  }, [currentIndex, setActiveIndex])

  // const handleClick = useCallback((index: number) => {
  //   setCurrentIndex(index)
  // }, [])

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length)
  }

  const handleBack = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length)
  }

  if (!movies || movies.length === 0) {
    return null
  }

  return (
    <div className='absolute bottom-1/2 left-2 right-2 flex items-center justify-between px-4'>
      <button onClick={handleBack} className='text-white transform hover:scale-125 transition-all duration-200'>
        <FontAwesomeIcon icon={faChevronLeft} size='2x' />
      </button>
      <button onClick={handleNext} className='text-white transform hover:scale-125 transition-all duration-200'>
        <FontAwesomeIcon icon={faChevronRight} size='2x' />
      </button>
    </div>
  )
}

export default PaginateIndicator
