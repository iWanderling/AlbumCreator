// Imports
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

// Layouts
import Root from "./layouts/Root"
import ProfileLayout from './layouts/ProfileLayout'

// Pages
import Main from './pages/Main/Main'
import Error from "./pages/Error/Error"
import Album from "./pages/Album/Album"
import Settings from "./pages/Settings/Settings"
import Profile from "./pages/Profile/Profile"
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Sites from './pages/Sites/Sites'
import MyAlbums from './pages/MyAlbums/MyAlbums'
import Galleries from './pages/Galleries/Galleries'
import EditAlbums from "./pages/EditAlbums/EditAlbums"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />} errorElement={<Error />}>
        <Route index path="/" element={<Main />} />
      </Route>
      <Route path="profile" element={<ProfileLayout />}>
        <Route path="settings" element={<Settings />} />
        <Route path="sites" element={<Sites />} />
        <Route path="galleries" element={<Galleries />} />
        <Route path="my-albums" element={<MyAlbums />} />
      </Route>
      <Route path="album/:album_id" element={<Album />} />
      <Route path="profile/:profile_id" element={<Profile />} />
      <Route path="profile/my-albums/:album_id" element={<EditAlbums />} />
      <Route path="login" element={<Login />}></Route>
      <Route path="register" element={<Register />}></Route>
    </>
  )
)

export default function App() {
  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}
