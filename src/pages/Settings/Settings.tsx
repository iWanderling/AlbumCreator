import { useState, useEffect, useRef } from "react"
import styles from "./Settings.module.css"
import { get, set } from "idb-keyval"


function PersonalData() {

  const [currentEmail, setCurrentEmail] = useState<string>();
  const [currentName, setCurrentName] = useState<string>();
  const [currentSurname, setCurrentSurname] = useState<string>();

  useEffect(() => {

    let getEmail = async () => {
      const email = await get("current_user");
      const userData = await get(email);

      if (userData) {
        setCurrentName(userData.name);
        setCurrentSurname(userData.surname);
        setCurrentEmail(userData.email);
      }
    };

    getEmail();
  }, [])

  return (
    <>
      <form className={styles.formData}>
        <div className={styles.formBlock}>
          <label className={styles.formLabel}>Ваше имя и фамилия</label>
          <div className={styles.formFullName}>
            <input className={styles.formDataInput} type="text" name="name" defaultValue={currentName} />
            <input className={styles.formDataInput} type="text" name="surname" defaultValue={currentSurname} />
          </div>
        </div>
        <div className={styles.formBlock}>
          <label className={styles.formLabel}>Ваш E-Mail</label>
          <input className={styles.formDataInput} type="email" name="email" defaultValue={currentEmail} />
        </div>
        <button className={styles.submitButton} type="submit" >Сохранить изменения</button>
      </form>
    </>
  )
}

function ChangePassword() {
  return (
    <>
      <form className={styles.formData}>
        <div className={styles.formBlock}>
          <label className={styles.formLabel}>Ваш старый пароль</label>
          <input className={styles.formPasswordInput} />
        </div>
        <div className={styles.formBlock}>
          <label className={styles.formLabel}>Ваш новый пароль</label>
          <input className={styles.formPasswordInput} />
        </div>
        <div className={styles.formBlock}>
          <label className={styles.formLabel}>Повторите новый пароль</label>
          <input className={styles.formPasswordInput} />
        </div>
        <button className={styles.submitButton}>Сохранить изменения</button>
      </form>
    </>
  )
}

export default function Settings() {

  const [activeSettings, setActiveSettings] = useState<boolean>(true);
  const [image, setImage] = useState<string>();
  const inputfRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const fileURL = URL.createObjectURL(files[0]);
    setImage(fileURL);
    e.target.value = "";
  }

  return (
    <>
      <main className={styles.mainBlock}>
        <div className={styles.settingsBlock}>
          <form className={styles.avatarBlock} onSubmit={(e) => e.preventDefault()}>
            <img className={styles.avatar} src={image} />
            <input
              ref={inputfRef}
              onChange={handleFileChange}
              type="file"
              accept="image/*"
              multiple
              hidden />
            <button className={styles.avatarButton} onClick={() => { inputfRef.current?.click() }}>Загрузить фото</button>
          </form>
          <ul className={styles.navBlock}>
            <li className={styles.navItem}><a className={styles.navLink} onClick={() => setActiveSettings(true)}>Личные данные</a></li>
            <li className={styles.navItem}><a className={styles.navLink} onClick={() => setActiveSettings(false)}>Сменить пароль</a></li>
          </ul>
          {!activeSettings && <ChangePassword />}
          {activeSettings && <PersonalData />}
        </div>
      </main>
    </>
  )
}
