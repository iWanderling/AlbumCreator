import styles from "./Header.module.css"
import { useNavigate } from "react-router-dom"

export default function Header() {

  const navigate = useNavigate();

  return (
    <header>
      <div className={styles.headerContent}>
        <div className={styles.brand}>
          Album Creator
        </div>
        <div className={styles.headerNav}>
          <ul className={styles.navMenu}>
            <li className={styles.menuItem}><a className={styles.menuLink}>Главная</a></li>
            <li className={styles.menuItem}><a className={styles.menuLink}>Шаблоны</a></li>
            <li className={styles.menuItem}><a className={styles.menuLink}>Тарифы</a></li>
          </ul>
        </div>
        <div>
          <button className={styles.loginButton} onClick={() => navigate("login")}>Войти</button>
        </div>
      </div>
    </header>
  )
}