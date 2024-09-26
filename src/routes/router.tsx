import { createBrowserRouter } from 'react-router-dom'
import Home from '~/components/home/Home'
import AppLayout from '~/components/layout/AppLayout'
import MovieDetail from '~/components/pages/MovieDetail'
import MovieList from '~/components/pages/MovieList'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'list',
        children: [
          {
            path: ':type',
            element: <MovieList />,
            children: [{ path: '*', element: <MovieList /> }]
          }
        ]
      },
      {
        path: 'chi-tiet/:movieName',
        element: <MovieDetail />
      }
    ]
  }
])
