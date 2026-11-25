import styles from "./MyAlbums.module.css"
import { get, set } from "idb-keyval"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function MyAlbums() {

  const navigate = useNavigate();
  const [albums, setAlbums] = useState<{ title: string, url: string }[]>([]);

  useEffect(() => {
    const downloadAlbums = async () => {
      const currentUserEmail = await get("current_user");
      const currentUserData = await get(currentUserEmail);

      if (currentUserData) {
        const allAlbums = currentUserData.albums;
        const covers = [];

        for (let i = 0; i < allAlbums.length; i++) {
          covers.push({
            title: allAlbums[i].title,
            url: URL.createObjectURL(allAlbums[i].images[0])
          })
        }
        setAlbums(covers);
      }
    }
    downloadAlbums();
  }, [albums]);

  const deleteAlbum = async (title: string) => {
    const currentUserEmail = await get("current_user");
    const currentUserData = await get(currentUserEmail);

    if (currentUserData) {
      const allAlbums = currentUserData.albums;
      const newAlbums = allAlbums.filter((a: any) => a.title !== title)
      await set(currentUserEmail, {
        ...currentUserData,
        albums: newAlbums
      })
      setAlbums((p) => [...newAlbums]);
    }
  }

  return (
    <>
      <main className={styles.main}>
        <h2 className={styles.title}>
          Мои альбомы
        </h2>
        <div className={styles.profileAlbums}>
          {albums && albums.map((album, index) => (
            <div className={styles.albumBlock} key={index}>
              <div className={styles.album} key={index} onClick={() => navigate(`/album/${album.title}`)}>
                <img className={styles.albumImg} src={album.url} />
                <div className={styles.albumTitle}>{album.title}</div>
              </div>
              <div className={styles.ruleButtons} >
                <button className={styles.ruleButton} onClick={() => navigate(`${album.title}`)}>Редактировать</button>
                <button className={styles.ruleButton} onClick={() => deleteAlbum(album.title)}>Удалить</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}