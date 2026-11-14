import { useRef, useState } from "react"
import styles from "./Galleries.module.css"
import { useNavigate } from "react-router-dom";
import { get, set } from "idb-keyval";

export default function Galleries() {

  const [title, setTitle] = useState<any>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>([]);
  const navigate = useNavigate();

  // Download images into album
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    let i = 0;
    const newUrls = files.map((file) => {
      set(`img${i}`, file);
      i++;
      return URL.createObjectURL(file);

    });
    setImages((prev) => [...prev, ...newUrls]);
    e.target.value = "";
  }

  // Change album title
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const albumTitle = formData.get("title");
    setTitle(albumTitle);
    e.currentTarget.reset();
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
            {images.map((image, index) => (
              <img className={styles.image} key={index} src={image} onClick={() => navigate(`/image/${image}`)} />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}