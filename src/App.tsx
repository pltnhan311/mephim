import { Suspense } from 'react'
import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '~/config/query-client'
import { createBrowserRouter, Outlet } from 'react-router-dom'
import AppLayout from '~/components/layout/AppLayout'
import MovieLayout from '~/components/layout/MovieLayout'
import SearchProvider from '~/context/SearchProvider'
import ModalProvider from '~/context/ModalProvider'
import Loading from '~/components/Loading'

const RootLayout = () => (
  <SearchProvider>
    <ModalProvider>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
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
          element: (
            <Suspense fallback={<Loading />}>
              <AppLayout />
            </Suspense>
          ),
          children: [
            {
              path: '/',
              element: (
                <Suspense fallback={<Loading />}>
                  <Home />
                </Suspense>
              )
            },
            {
              path: 'list',
              children: [
                {
                  path: ':type',
                  element: (
                    <Suspense fallback={<Loading />}>
                      <MovieList />
                    </Suspense>
                  )
                }
              ]
            },
            {
              path: 'chi-tiet/:movieSlug',
              element: (
                <Suspense fallback={<Loading />}>
                  <MovieLayout />
                </Suspense>
              ),
              children: [
                {
                  index: true,
                  element: <MovieDetail />
                }
              ]
            },
            {
              path: 'xem-phim/:movieSlug',
              element: (
                <Suspense fallback={<Loading />}>
                  <MovieLayout />
                </Suspense>
              ),
              children: [
                {
                  index: true,
                  element: <StreamingBasic />
                }
              ]
            },
            {
              path: 'tim-kiem',
              element: (
                <Suspense fallback={<Loading />}>
                  <SearchList />
                </Suspense>
              )
            },
            {
              path: ':filterType/:filter',
              element: (
                <Suspense fallback={<Loading />}>
                  <MovieFilter />
                </Suspense>
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
