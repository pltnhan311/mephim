import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { createContext, useContext, useEffect, useState } from 'react'

interface ModalContextType {
  openPopup: (content: React.ReactNode) => void
}

const ModalContext = createContext<ModalContextType | null>(null)

export const useModalContext = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider')
  }
  return context
}

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isShow, setIsShow] = useState(false)
  const [content, setContent] = useState<React.ReactNode>()

  useEffect(() => {
    document.body.style.overflow = isShow ? 'hidden' : 'scroll'
  }, [isShow])

  const openPopup = (content: React.ReactNode) => {
    setIsShow(true)
    setContent(content)
  }

  const closePopup = () => {
    setIsShow(false)
  }

  return (
    <ModalContext.Provider value={{ openPopup }}>
      {children}
      {isShow && (
        <div className='fixed inset-0 z-50'>
          <div className='absolute inset-0 bg-black/80 flex items-center justify-center' onClick={closePopup}>
            <div className='relative z-10' onClick={(e) => e.stopPropagation()}>
              {content}
              <button
                className='absolute -top-4 -right-4 text-white hover:text-gray-300'
                onClick={closePopup}
                aria-label='Close modal'
              >
                <FontAwesomeIcon icon={faXmarkCircle} size='2xl' />
              </button>
            </div>
          </div>
          <div></div>
        </div>
      )}
    </ModalContext.Provider>
  )
}

export default ModalProvider
