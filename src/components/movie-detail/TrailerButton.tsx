import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import { useModalContext } from '~/context/ModalProvider'
import { getYouTubeEmbedUrl } from '~/constant/constant'

interface TrailerButtonProps {
  trailerUrl: string
}

const TrailerButton = ({ trailerUrl }: TrailerButtonProps) => {
  const { openPopup } = useModalContext()

  const handleClick = () => {
    openPopup(
      <div className='w-[70vw] h-[70vh] max-w-4xl max-h-[90vh]'>
        <iframe title='Trailer' src={getYouTubeEmbedUrl(trailerUrl)} className='w-full h-full' allowFullScreen />
      </div>
    )
  }

  return (
    <button
      className='relative flex items-center bg-gradient-to-r from-lime-500 to-emerald-500 hover:from-emerald-500 hover:to-lime-400 py-2 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl'
      onClick={handleClick}
    >
      <FontAwesomeIcon icon={faPlayCircle} className='mr-2' />
      Trailer
      <span className='absolute inset-0 rounded-lg bg-gradient-to-r from-pink-700 to-orange-700 opacity-10 blur'></span>
    </button>
  )
}

export default TrailerButton
