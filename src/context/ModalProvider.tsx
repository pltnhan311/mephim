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
  return (
    <ModalContext.Provider value={{ openPopup }}>
      {children}
      {isShow && (
        <div className='fixed inset-0 text-white'>
          <div
            className='absolute inset-0 flex items-center justify-center bg-black/70'
            onClick={() => setIsShow(false)}
          >
            {content}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  )
}

export default ModalProvider
