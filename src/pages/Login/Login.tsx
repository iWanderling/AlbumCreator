import styles from "./Login.module.css"
import { useNavigate } from "react-router-dom"
import { get, set } from "idb-keyval";


export default function Login() {

  const navigate = useNavigate();
  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const enteredPassword = formData.get("password");
    e.currentTarget.reset();

    if (typeof email === "string" && typeof enteredPassword === "string") {
      const savedPassword = await get(email);
      if (savedPassword === enteredPassword) {
        await set("current_user", email);
        navigate("/profile");
      }
    }
  }

  return (
    <>
      <header className={styles.loginHeader}>
        <div className={styles.logo}>Album Creator</div>
        <div className={styles.close}><a className={styles.closeLink} onClick={() => { navigate('/') }}>На главную</a></div>
      </header>
      <main className={styles.mainBlock}>
        <div className={styles.title}>Войти</div>
        <div className={styles.register}>
          <span>Нет аккаунта? <a className={styles.registerLink} onClick={() => navigate("/register")}>Зарегистрируйтесь</a></span>
        </div>
        <form onSubmit={handleLogin} className={styles.loginForm}>
          <div><input className={styles.formInputEmail} type="email" name="email" id="email" placeholder="Ваша эл. почта" required /></div>
          <div><input className={styles.formInputPassword} type="password" name="password" id="password" placeholder="Ваш пароль" required /></div>
          <button className={styles.loginButton} onClick={() => navigate("/profile")}>Войти</button>
        </form>
      </main>
    </>
  )
}