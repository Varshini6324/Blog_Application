import { createBrowserRouter, RouterProvider } from 'react-router'
import RootLayout from './components/RootLayout'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import AddArticle from './components/AddArticle'
import UserDashboard from './components/UserDashboard'
import AdminDashboard from './components/AdminDashboard'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './components/ProtectedRoute'
import ArticleById from './components/ArticleById'
import ErrorBoundary from './components/ErrorBoundary'
import AuthorProfile from './components/AuthorProfile'
import AuthorArticles from './components/AuthorArticles'
import EditArticle from './components/EditArticle'

function App() {
  const routerObj = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          path: '',
          element: <Home />,
        },
        {
          path: 'register',
          element: <Register />,
        },
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'userdashboard',
          element: (
            <ProtectedRoute allowedRoles={['USER']}>
              <UserDashboard />
            </ProtectedRoute>
          ),
        },
        {
          // AuthorProfile is the layout — its children render inside <Outlet />
          path: 'authordashboard',
          element: (
            <ProtectedRoute allowedRoles={['AUTHOR']}>
              <AuthorProfile />
            </ProtectedRoute>
          ),
          children: [
            {
              // Default: /authordashboard → shows AuthorArticles
              index: true,
              element: <AuthorArticles />,
            },
            {
              path: 'articles',
              element: <AuthorArticles />,
            },
            {
              path: 'addarticle',
              element: <AddArticle />,
            },
          ],
        },
        {
          path: 'admindashboard',
          element: <AdminDashboard />,
        },
        {
          path: 'article/:id',
          element: <ArticleById />,
        },
        {
          path: 'edit-article/:id',
          element: <EditArticle />,
        },
      ],
    },
  ])

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={routerObj} />
    </>
  )
}

export default App