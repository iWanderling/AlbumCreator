import type Album from "./album"

export default interface User {
  login: string,
  email: string,
  avatar: string,
  name: string,
  surname?: string,
  password: string,
  albums: Album[]
}