import styles from "./Register.module.css"
import { useNavigate } from "react-router-dom"

export default function Register() {

  const navigate = useNavigate();

  return (
    <>
      <header className={styles.registerHeader}>
        <div className={styles.logo}>Album Creator</div>
        <div className={styles.close}><a className={styles.closeLink} onClick={() => { navigate('/') }}>На главную</a></div>
      </header>
      <main className={styles.mainBlock}>
        <div className={styles.title}>Регистрация</div>
        <div className={styles.login}>
          <span>Уже есть аккаунт? <a className={styles.loginLink} onClick={() => navigate("/login")}>Войти</a></span>
        </div>
        <form className={styles.registerForm}>
          <div><input className={styles.formInputEmail} type="email" name="email" id="email" placeholder="Ваша эл. почта" required /></div>
          <div><input className={styles.formInputPassword} type="password" name="password" id="password" placeholder="Ваш пароль" required /></div>
          <button className={styles.registerButton}>Регистрация</button>
        </form>
      </main>
    </>)
}