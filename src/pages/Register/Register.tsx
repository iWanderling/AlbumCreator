import styles from "./Register.module.css"
import { useNavigate } from "react-router-dom"
import { get, set } from "idb-keyval";


export default function Register() {

  const navigate = useNavigate();
  const handleRegister = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    e.currentTarget.reset();

    if (typeof email === "string" && typeof password === "string") {
      await set(email, password);
      await set("current_user", email);
      navigate("/profile");
    }
  }

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
        <form onSubmit={handleRegister} className={styles.registerForm}>
          <div><input
            className={styles.formInputEmail}
            type="email"
            name="email"
            id="email"
            placeholder="Ваша эл. почта"
            required /></div>
          <div><input
            className={styles.formInputPassword}
            type="password"
            name="password"
            id="password"
            placeholder="Ваш пароль"
            required /></div>
          <button className={styles.registerButton} type="submit">Регистрация</button>
        </form>
      </main>
    </>)
}