import { useRef, useState } from "react"
import styles from "./Galleries.module.css"
import { useNavigate } from "react-router-dom";
import { get, set } from "idb-keyval";

export default function Galleries() {

  const [title, setTitle] = useState<any>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [urlImages, setUrlImages] = useState<string[]>([]);
  const [fileImages, setFileImages] = useState<File[]>([]);
  const navigate = useNavigate();

  // Download images into album
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const filesURL: string[] = [];

    for (let i = 0; i < files.length; i++) {
      filesURL.push(URL.createObjectURL(files[i]));
    }

    setUrlImages((p) => [...p, ...filesURL]);
    setFileImages((p) => [...p, ...files]);
    e.target.value = "";
  }

  // Change album title
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const albumTitle = formData.get("title");
    
    const currentUserEmail = await get("current_user");
    if (currentUserEmail) {
      const currentUserData = await get(currentUserEmail);
      currentUserData.albums.push({
        title: albumTitle,
        images: fileImages
      });
      await set(currentUserEmail, {
        ...currentUserData
      });
      navigate(`/profile/my-albums/${albumTitle}`);
    };
  }

  return (
    <>
      <main className={styles.main}>
        <div className={styles.content}>
          <h2 className={styles.title}>Создать альбом</h2>
          <form onSubmit={handleSubmit} className={styles.formData}>
            <div className={styles.formBlock}>
              <label className={styles.formLabel}>Название альбома</label>
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
          <div className={styles.albumTitle}>{title}</div>
          <div className={styles.albumImages}>
            {urlImages.map((image, index) => (
              <img className={styles.image} key={index} src={image} onClick={() => navigate(`/image/${image}`)} />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}