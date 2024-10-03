import { RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '~/config/query-client'
import { createBrowserRouter, Outlet } from 'react-router-dom'
import AppLayout from '~/components/layout/AppLayout'
import MovieLayout from '~/components/layout/MovieLayout'
import SearchProvider from '~/context/SearchProvider'
import ModalProvider from '~/context/ModalProvider'
import React from 'react'
import Loading from '~/components/Loading'

const RootLayout = () => (
  <SearchProvider>
    <ModalProvider>
      <Outlet />
    </ModalProvider>
  </SearchProvider>
)

const Home = React.lazy(() => import('~/components/home/Home'))
const MovieList = React.lazy(() => import('~/components/pages/MovieList'))
const MovieDetail = React.lazy(() => import('~/components/pages/MovieDetail'))
const StreamingBasic = React.lazy(() => import('~/components/pages/StreamingBasic'))
const SearchList = React.lazy(() => import('~/components/pages/SearchList'))
const MovieFilter = React.lazy(() => import('~/components/pages/MovieFilter'))

const App = () => {
  const router = createBrowserRouter([
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
                  element: (
                    <React.Suspense fallback={<Loading />}>
                      <MovieList />
                    </React.Suspense>
                  ),
                  children: [{ path: '*', element: <MovieList /> }]
                }
              ]
            },
            {
              path: 'chi-tiet/:movieSlug',
              element: <MovieLayout />,
              children: [
                {
                  index: true,
                  element: (
                    <React.Suspense fallback={<Loading />}>
                      <MovieDetail />
                    </React.Suspense>
                  )
                }
              ]
            },
            {
              path: 'xem-phim/:movieSlug',
              element: <MovieLayout />,
              children: [
                {
                  index: true,
                  element: (
                    <React.Suspense fallback={<Loading />}>
                      <StreamingBasic />
                    </React.Suspense>
                  )
                }
              ]
            },
            {
              path: 'tim-kiem',
              element: (
                <React.Suspense fallback={<Loading />}>
                  <SearchList />
                </React.Suspense>
              )
            },
            {
              path: ':filterType/:filter',
              element: (
                <React.Suspense fallback={<Loading />}>
                  <MovieFilter />
                </React.Suspense>
              )
            }
          ]
        }
      ]
    }
  ])

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
