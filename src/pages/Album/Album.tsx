import "./Album.module.css"
import styles from "./Album.module.css"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { get } from "idb-keyval"


export default function Album() {

  const [albumTitle, setAlbumTitle] = useState<string>()
  const [urlAlbumImages, setUrlAlbumImages] = useState<string[]>([]);
  const albumID = useParams()["album_id"];
  const navigate = useNavigate();

  useEffect(() => {
    const downloadAlbum = async () => {
      const currentUserEmail = await get("current_user");
      if (currentUserEmail) {
        const currentUserData = await get(currentUserEmail);
        const album = currentUserData.albums.find((a: any) => a.title === albumID);
        if (album) {
          const filesURL: string[] = [];

          for (let i = 0; i < album.images.length; i++) {
            filesURL.push(URL.createObjectURL(album.images[i]));
          }

          setAlbumTitle(album.title);
          setUrlAlbumImages(filesURL);
        }
      }
    }

    if (albumID) {
      downloadAlbum();
    }
  }, []);

  return (
    <>
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.albumTitle}>{albumTitle}</div>
          <div className={styles.albumImages}>
            {urlAlbumImages.map((image, index) => (
              <img className={styles.image} key={index} src={image} onClick={() => navigate(`/image/${image}`)} />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}