export const APP_DOMAIN_CDN_IMAGE = 'https://img.ophim.live'

export const APP_DOMAIN_FRONTEND = 'https://ophim17.cc'

export const typeData = [
  {
    _id: 1,
    name: 'Phim lẻ',
    slug: 'phim-le'
  },
  {
    _id: 2,
    name: 'Phim bộ',
    slug: 'phim-bo'
  },
  {
    _id: 3,
    name: 'Phim hoạt hình',
    slug: 'hoat-hinh'
  },
  {
    _id: 4,
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
    _id: 1,
    name: 'Thời gian cập nhật',
    slug: 'modified.time'
  },
  {
    _id: 2,
    name: 'Năm sản xuất',
    slug: 'year'
  },
  {
    _id: 3,
    name: 'Lượt xem',
    slug: 'view'
  }
]
