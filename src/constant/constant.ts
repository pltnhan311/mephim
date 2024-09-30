export const APP_DOMAIN_CDN_IMAGE = 'https://img.ophim.live'

export const APP_DOMAIN_FRONTEND = 'https://ophim17.cc'

export const getYouTubeEmbedUrl = (url: string) => {
  const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/)
  return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : url
}

export const formatTime = (seconds: number) => {
  const date = new Date(seconds * 1000)
  const hh = date.getUTCHours()
  const mm = date.getUTCMinutes()
  const ss = date.getUTCSeconds().toString().padStart(2, '0')
  if (hh) {
    return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`
  }
  return `${mm}:${ss}`
}

export const stripHtmlTags = (htmlString: string | undefined) => {
  if (!htmlString) return ''

  // Step 1: Remove HTML tags
  let cleanText = htmlString.replace(/<\/?[^>]+(>|$)/g, '')

  // Step 2: Replace common HTML entities
  cleanText = cleanText.replace(/&nbsp;/g, ' ') // Replace non-breaking space
  cleanText = cleanText.replace(/&amp;/g, '&') // Replace &amp; with &
  cleanText = cleanText.replace(/&quot;/g, '"') // Replace &quot; with "
  cleanText = cleanText.replace(/&#039;/g, "'") // Replace &#039; with '
  cleanText = cleanText.replace(/&lt;/g, '<') // Replace &lt; with <
  cleanText = cleanText.replace(/&gt;/g, '>') // Replace &gt; with >

  return cleanText
}

export const typeData = [
  {
    _id: '1',
    name: 'Phim lẻ',
    slug: 'phim-le'
  },
  {
    _id: '2',
    name: 'Phim bộ',
    slug: 'phim-bo'
  },
  {
    _id: '3',
    name: 'Phim hoạt hình',
    slug: 'hoat-hinh'
  },
  {
    _id: '4',
    name: 'TV Shows',
    slug: 'tv-shows'
  }
]

export const generateYearOptions = () => {
  const currentYear = new Date().getFullYear()
  const startYear = 2010
  const years = []

  // Generate years from 2010 to current year
  for (let year = currentYear; year >= startYear; year--) {
    years.push({
      _id: year.toString(),
      name: year.toString(),
      slug: year.toString()
    })
  }

  // Add "Before 2010" option
  years.push({ _id: 'before_2010', name: 'Trước 2010', slug: 'before-2010' })

  return years
}

export const yearOptions = generateYearOptions()

export const sortOptions = [
  {
    _id: '1',
    name: 'Thời gian cập nhật',
    slug: 'modified.time'
  },
  {
    _id: '2',
    name: 'Năm sản xuất',
    slug: 'year'
  },
  {
    _id: '3',
    name: 'Lượt xem',
    slug: 'view'
  }
]
