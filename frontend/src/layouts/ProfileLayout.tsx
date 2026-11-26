import ProfileHeader from "../components/ProfileHeader/ProfileHeader"
import { Outlet } from 'react-router-dom'
import { get, set } from "idb-keyval"

export default function ProfileLayout() {
  return (
    <>
      <ProfileHeader />
      <Outlet />
    </>
  )
}