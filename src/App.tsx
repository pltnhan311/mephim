import { RouterProvider } from 'react-router-dom'
import { router } from '~/routes/router'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '~/config/query-client'
import ModalProvider from '~/context/ModalProvider'

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <RouterProvider router={router} />
      </ModalProvider>
    </QueryClientProvider>
  )
}
