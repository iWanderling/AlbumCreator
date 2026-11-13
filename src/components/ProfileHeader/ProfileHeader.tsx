import styles from "./ProfileHeader.module.css"
import { useNavigate } from "react-router-dom"

export default function ProfileHeader() {

  const navigate = useNavigate();

  return (
    <>
      <header className={styles.profileHeader}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>Album Creator</div>
          <ul className={styles.headerNav}>
            <li className={styles.navItem}>Сайты</li>
            <li className={styles.navItem}>Галереи</li>
            <li className={styles.navItem}>Настройки</li>
            <li className={styles.profileSettings}>
              <button className={styles.profileSettingsButton} onClick={() => navigate("settings")}></button>
            </li>
          </ul>
        </div>
      </header>
    </>
  )
}