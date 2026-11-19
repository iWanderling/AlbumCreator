import { useState, useEffect } from "react"
import styles from "./Settings.module.css"
import { get, set } from "idb-keyval"


function PersonalData() {

  const [currentEmail, setCurrentEmail] = useState<string>();
  const [currentName, setCurrentName] = useState<string>();
  const [currentSurname, setCurrentSurname] = useState<string>();

  useEffect(() => {
    let getEmail = async () => {
      const email = await get("current_user");
      const name = await get("name");
      const surname = await get("surname");
      if (email && name && surname) {
        setCurrentEmail(email);
        setCurrentName(name);
        setCurrentSurname(surname);
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

  return (
    <>
      <main className={styles.mainBlock}>
        <div className={styles.settingsBlock}>
          <div className={styles.avatarBlock}>
            <div className={styles.avatar} />
            <button className={styles.avatarButton}>Загрузить фото</button>
          </div>
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
