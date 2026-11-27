import styles from "./Register.module.css"
import { useNavigate } from "react-router-dom"

async function handleRegister(e: React.SubmitEvent<HTMLFormElement>) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);

  const payload = {
    login: formData.get("login"),
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
    surname: formData.get("surname") || null,
    avatar: null
  };

  const response = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const status = await response.json();

}

function Header() {
  const navigate = useNavigate();

  return (
    <header className={styles.registerHeader}>
      <div className={styles.logo}>Album Creator</div>
      <div className={styles.close}><a className={styles.closeLink} onClick={() => { navigate('/') }}>На главную</a></div>
    </header>
  )
}

function FormHeader() {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.title}>Регистрация</div>
      <div className={styles.login}>
        <span>Уже есть аккаунт? <a className={styles.loginLink} onClick={() => navigate("/login")}>Войти</a></span>
      </div>
    </>
  )
}

function RegisterForm() {
  return (
    <form onSubmit={handleRegister} className={styles.registerForm}>
      <div><input
        className={styles.formInputEmail}
        type="text"
        name="login"
        id="login"
        placeholder="Ваш логин"
        required />
      </div>
      <div><input
        className={styles.formInputEmail}
        type="email"
        name="email"
        id="email"
        placeholder="Ваша эл. почта"
        required />
      </div>
      <div><input
        className={styles.formInputEmail}
        type="text"
        name="name"
        id="name"
        placeholder="Ваше имя"
        required /></div>
      <div><input
        className={styles.formInputEmail}
        type="text"
        name="surname"
        id="surname"
        placeholder="Ваша фамилия" />
      </div>
      <div><input
        className={styles.formInputPassword}
        type="password"
        name="password"
        id="password"
        placeholder="Ваш пароль"
        required /></div>
      <button className={styles.registerButton} type="submit">Регистрация</button>
    </form>
  )
}

export default function Register() {
  // useEffect(() => {
  //   const redirectIfAuthorised = async () => {
  //     const currentUser = await get("current_user");
  //     if (currentUser) navigate("/profile/settings");
  //   }
  //   redirectIfAuthorised();
  // }, [])

  return (
    <>
      <Header />
      <main className={styles.mainBlock}>
        <FormHeader />
        <RegisterForm />
      </main>
    </>)
}