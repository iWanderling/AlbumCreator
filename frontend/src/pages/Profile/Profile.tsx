import { useNavigate, useParams } from "react-router-dom"
import styles from "./Profile.module.css"
import { get, set } from "idb-keyval"
import { useEffect, useState } from "react";


export default function Profile() {

  const navigate = useNavigate();
  const profileID = useParams()["profile_id"];
  const [avatar, setAvatar] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [albums, setAlbums] = useState<{ title: string, url: string }[]>();
  
  console.log(profileID);
  useEffect(() => {
    const downloadProfile = async () => {
      if (profileID) {
        const profileData = await get(profileID);
        const profileAvatar = URL.createObjectURL(profileData.avatar);
        const profileTitle = profileData.name + " " + profileData.surname;
        const profileAlbums = profileData.albums;

        const covers = [];

        for (let i = 0; i < profileAlbums.length; i++) {
          covers.push({
            title: profileAlbums[i].title,
            url: URL.createObjectURL(profileAlbums[i].images[0])
          })
        }

        setAvatar(profileAvatar);
        setTitle(profileTitle);
        setAlbums(covers);
      }
    }

    downloadProfile();

  }, [])

  return (
    <>
      <main className={styles.mainProfile}>
        <div className={styles.profileInfo}>
          <img className={styles.profileAvatar} src={avatar} />
          <div className={styles.profileTitle}>{title}</div>
        </div>
        <div className={styles.profileAlbums}>
          {albums && albums.map((album, index) => (
            <div className={styles.album} key={index} onClick={() => navigate(`/album/${album.title}`)}>
              <img className={styles.albumImg} src={album.url} />
              <div className={styles.albumTitle}>{album.title}</div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}