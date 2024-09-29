import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDebounce } from 'use-debounce'
import { useSearch } from '~/api/movie/use-search'
import { MovieData } from '~/types/movie/movie-types'

interface SearchContextType {
  searchKeyword: string
  setSearchKeyword: (value: string) => void
  results: MovieData
  setResults: (value: MovieData) => void
  isOpen: boolean
  onToggle: () => void
  onInputChange: (value: string) => void
  onClear: () => void
  searchBarRef: React.RefObject<HTMLDivElement>
  onSearch: (value: string) => void
  data: MovieData
}

const SearchContext = createContext<SearchContextType | null>(null)

export const useSearchContext = () => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider')
  }
  return context
}

const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<MovieData | null>(null)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500)

  const [, setSearchParams] = useSearchParams()

  const searchBarRef = useRef<HTMLDivElement>(null)

  const { data } = useSearch(debouncedSearchKeyword)

  useEffect(() => {
    if (data) {
      setResults(data as MovieData)
    }
  }, [data])

  const onToggle = () => {
    setIsOpen(!isOpen)
  }

  const onInputChange = (value: string) => {
    setSearchKeyword(value)
    if (value.trim() === '') {
      setResults(null)
    }
  }

  const onClear = () => {
    setSearchKeyword('')
  }

  const onSearch = (value: string) => {
    if (value.trim() !== '') {
      setSearchParams({ keyword: value })
      navigate(`/tim-kiem?keyword=${encodeURIComponent(value)}`)
    } else {
      setSearchParams({})
      navigate('/')
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchKeyword('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <SearchContext.Provider
      value={{
        searchKeyword,
        setSearchKeyword,
        results: results as MovieData,
        setResults,
        isOpen,
        onToggle,
        onInputChange,
        onClear,
        searchBarRef,
        onSearch,
        data: data as MovieData
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export default SearchProvider
