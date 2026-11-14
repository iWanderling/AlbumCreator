import styles from "./ProfileHeader.module.css"
import { useNavigate } from "react-router-dom"

export default function ProfileHeader() {

  const navigate = useNavigate();

  return (
    <>
      <header className={styles.profileHeader}>
        <div className={styles.headerContent}>
          <div className={styles.logo} onClick={() => navigate("/")}>Album Creator</div>
          <ul className={styles.headerNav}>
            <li className={styles.navItem}><a className={styles.navLink} onClick={() => navigate("sites")}>Сайты</a></li>
            <li className={styles.navItem}><a className={styles.navLink} onClick={() => navigate("galleries")}>Галереи</a></li>
            <li className={styles.navItem}><a className={styles.navLink} onClick={() => navigate("settings")}> Настройки</a></li>
            <li className={styles.profileSettings}>
              <button className={styles.profileSettingsButton} onClick={() => navigate("settings")}></button>
            </li>
          </ul>
        </div>
      </header >
    </>
  )
}