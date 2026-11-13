import { useState } from "react"
import styles from "./Settings.module.css"



function PersonalData() {
  return (
    <>
      <form className={styles.formData}>
        <div className={styles.formBlock}>
          <label className={styles.formLabel}>Ваше имя и фамилия</label>
          <div className={styles.formFullName}>
            <input className={styles.formDataInput} />
            <input className={styles.formDataInput} />
          </div>
        </div>
        <div className={styles.formBlock}>
          <label className={styles.formLabel}>Ваш E-Mail</label>
          <input className={styles.formDataInput} />
        </div>
        <button className={styles.submitButton}>Сохранить изменения</button>
      </form>
    </>
  )
}

function ChangePassword() {
  return (
    <>
      <form className={styles.formData}>
        <div className={styles.formBlock}>
          <label className={styles.formLabel}></label>
          <input className={styles.formPasswordInput} />
        </div>
        <div className={styles.formBlock}>
          <label className={styles.formLabel}></label>
          <input className={styles.formPasswordInput} />
        </div>
        <div className={styles.formBlock}>
          <label className={styles.formLabel}></label>
          <input className={styles.formPasswordInput} />
        </div>
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