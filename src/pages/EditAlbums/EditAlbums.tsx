import styles from "./EditAlbums.module.css"
import { get, set } from "idb-keyval"
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditAlbums() {

  const navigate = useNavigate();
  const albumID = useParams()["album_id"]
  const [title, setTitle] = useState<string>();
  const [album, setAlbum] = useState<{ file: File, url: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    const downloadAlbum = async () => {
      const currentUserEmail = await get("current_user");
      const currentUserData = await get(currentUserEmail);

      if (currentUserData) {
        const currentAlbum = currentUserData.albums.find((a: any) => a.title === albumID);
        const data = [];

        for (let i = 0; i < currentAlbum.images.length; i++) {
          data.push({ file: currentAlbum.images[i], url: URL.createObjectURL(currentAlbum.images[i]) })
        }
        setAlbum(data);
        setTitle(currentAlbum.title)
      }
    }
    downloadAlbum();
  }, [])

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const albumTitle = formData.get("title") as string;

    const currentUserEmail = await get("current_user");
    if (currentUserEmail) {
      const currentUserData = await get(currentUserEmail);
      const currentUserAlbums = currentUserData.albums;
      for (let i = 0; i < currentUserAlbums.length; i++) {
        if (currentUserAlbums[i].title === albumID) {
          currentUserAlbums[i].title = albumTitle;
          currentUserAlbums[i].images = album.map((value) => value.file);
        }
      }
      set(currentUserEmail, {
        ...currentUserData,
        albums: [...currentUserAlbums]
      })
      setTitle(albumTitle);
      navigate(`/profile/my-albums/`);
    }
  }

  // удалять изображения

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const data: { file: File, url: string }[] = [];

    for (let i = 0; i < files.length; i++) {
      data.push({
        file: files[i],
        url: URL.createObjectURL(files[i])
      });
    }

    setAlbum((p) => [...p, ...data]);
    e.target.value = "";
  }

  const deleteImage = (url: string) => {
    setAlbum((p) => p.filter((value) => value.url != url));
  }

  return (
    <>
      <main className={styles.main}>
        <h2 className={styles.title}>{title}</h2>
        <form onSubmit={handleSubmit} className={styles.formData}>
          <div className={styles.formBlock}>
            <input
              className={styles.formDataInput}
              type="text"
              name="title"
              required
            />
          </div>
          <button
            className={styles.submitButton}
            type="submit">
            Сохранить
          </button>
          <input
            ref={inputRef}
            onChange={handleFileChange}
            type="file"
            accept="image/*"
            multiple
            hidden />
          <button
            className={styles.submitButton}
            onClick={() => inputRef.current?.click()}>
            Загрузить изображения
          </button>
        </form>
        <div className={styles.images}>
          {album && album.map((data, index) => (
            <img className={styles.albumImg} key={index} src={data.url} onClick={() => deleteImage(data.url)}/>
          ))}
        </div>
      </main>
    </>
  )
}