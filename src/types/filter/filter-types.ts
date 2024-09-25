export interface IFilterItem {
  items: [
    {
      _id: string
      name: string
      slug: string
    }
  ]
}

export interface IFilterGenreItem {
  _id: string
  name: string
  slug: string
}

export interface IFilterCountryItem {
  _id: string
  name: string
  slug: string
}

export interface IFilterResponse {
  status: string
  message: string
  data: {
    items: IFilterGenreItem[]
  }
}
