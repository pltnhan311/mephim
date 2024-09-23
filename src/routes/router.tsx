import { createBrowserRouter } from 'react-router-dom'
import Home from '~/components/home/Home'
import AppLayout from '~/components/layout/AppLayout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      }
    ]
  }
])
