import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const MovieCardSkeleton = () => {
  return (
    <div className='relative block overflow-hidden rounded-lg bg-blackoil shadow-lg'>
      <div className='aspect-[2/3] overflow-hidden'>
        <Skeleton height='60%' baseColor='#292a2b' highlightColor='#444' />
      </div>
      <div className='absolute inset-x-0 bottom-0 p-4'>
        <Skeleton width='80%' height={20} baseColor='#292a2b' highlightColor='#444' />
        <Skeleton width='60%' height={16} baseColor='#292a2b' highlightColor='#444' />
      </div>
    </div>
  )
}

export default MovieCardSkeleton
