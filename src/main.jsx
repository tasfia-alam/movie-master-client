import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import MainLayout from './layout/MainLayout.jsx';
import Home from './Pages/Home.jsx';
import AllMovies from './Pages/AllMovies.jsx'
import AuthProvider from './context/AuthProvider.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import MovieDetails from './Pages/MovieDetails.jsx';
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
import MyCollection from './Pages/MyCollection.jsx';
import WatchList from './Pages/WatchList.jsx';
import Profile from './Pages/Profile.jsx';
import AddMovie from './Pages/AddMovie.jsx'
import UpdateMovie from './Pages/UpdateMovie.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import NotFound from './Pages/NotFound.jsx';

const user = { email: "user@example.com" };

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/allmovies',
        Component: AllMovies
      },
     {
        path: "/movieDetails/:id",
        element: (
          <ProtectedRoute user={user}>
            <MovieDetails loggedInUserEmail={user?.email} />
          </ProtectedRoute>
        ),
      },
       {
        path: "/mycollection",
        element: (
          <ProtectedRoute user={user}>
            <MyCollection loggedInUserEmail={user?.email} />
          </ProtectedRoute>
        ),
      },
       {
        path: "/movies/update/:id",
        element: (
          <ProtectedRoute user={user}>
            <UpdateMovie loggedInUserEmail={user?.email} />
          </ProtectedRoute>
        ),
      },
      {
        path: "/addmovie",
        Component: AddMovie
      },
       {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
       {
        path: "/watchlist",
        Component: WatchList
      },
      {
        path:'/profile',
        Component: Profile
      },
      {
        path: '*',
        Component: NotFound
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
<ErrorBoundary>
  <AuthProvider>
      <RouterProvider router={router} />,

</AuthProvider>
</ErrorBoundary>
  </StrictMode>,
)
