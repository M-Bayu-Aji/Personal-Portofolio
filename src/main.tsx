import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import HomeLayout from './components/Layouts/HomeLayout.tsx'
import NotFoundPage from './components/pages/NotFoundPage.tsx'
import LandingPageLayout from './components/Layouts/LandingPageLayouts.tsx'

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: '/',
    element: <LandingPageLayout />,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
