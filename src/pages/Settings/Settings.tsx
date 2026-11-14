import { useState } from "react"
import styles from "./Settings.module.css"



function PersonalData() {
  return (
    <>
      <form className={styles.formData}>
        <div className={styles.formBlock}>
          <label className={styles.formLabel}>Ваше имя и фамилия</label>
          <div className={styles.formFullName}>
            <input className={styles.formDataInput} type="text" name="name" />
            <input className={styles.formDataInput} type="text" name="surname" />
          </div>
        </div>
        <div className={styles.formBlock}>
          <label className={styles.formLabel}>Ваш E-Mail</label>
          <input className={styles.formDataInput} type="email" name="email" />
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
