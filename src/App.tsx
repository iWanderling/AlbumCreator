// Imports
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

// Layouts
import Root from "./layouts/Root"

// Pages
import Main from './pages/Main/Main'
import Error from "./pages/Error/Error"
import Album from "./pages/Album/Album"
import Profile from "./pages/Album/Album"


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<Error />}>
      <Route path="/" element={<Main />}>
        <Route path="profile/:profile_id" element={<Profile />}>
          <Route path="profile/:profile_id/album_id" element={<Album />}>
          </Route>
        </Route>
      </Route>
    </Route>
  )
)

export default function App() {
  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}
