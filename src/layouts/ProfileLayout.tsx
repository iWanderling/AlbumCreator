import ProfileHeader from "../components/ProfileHeader/ProfileHeader";
import { Outlet } from 'react-router-dom'

export default function ProfileLayout() {

  return (
    <>
      <ProfileHeader />
      <Outlet />
    </>
  )
}