import { createBrowserRouter, Outlet } from 'react-router-dom'
import Home from '~/components/home/Home'
import AppLayout from '~/components/layout/AppLayout'
import MovieLayout from '~/components/layout/MovieLayout'
import MovieDetail from '~/components/pages/MovieDetail'
import MovieList from '~/components/pages/MovieList'
import SearchList from '~/components/pages/SearchList'
import StreamingMovie from '~/components/pages/StreamingMovie'
import SearchProvider from '~/context/SearchProvider'
import ModalProvider from '~/context/ModalProvider'

const RootLayout = () => (
  <SearchProvider>
    <ModalProvider>
      <Outlet />
    </ModalProvider>
  </SearchProvider>
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
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
            path: 'chi-tiet/:movieSlug',
            element: <MovieLayout />,
            children: [{ index: true, element: <MovieDetail /> }]
          },
          {
            path: 'xem-phim/:movieSlug',
            element: <MovieLayout />,
            children: [{ index: true, element: <StreamingMovie /> }]
          },
          {
            path: 'tim-kiem',
            element: <SearchList />
          }
        ]
      }
    ]
  }
])
