import styles from "./Login.module.css"
import { useNavigate } from "react-router-dom"

function Header() {
  const navigate = useNavigate();

  return (
    <header className={styles.loginHeader}>
      <div className={styles.logo}>Album Creator</div>
      <div className={styles.close}><a className={styles.closeLink} onClick={() => { navigate('/') }}>На главную</a></div>
    </header>
  )
}

function FormHeader() {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.title}>Войти</div>
      <div className={styles.register}>
        <span>Нет аккаунта? <a className={styles.registerLink} onClick={() => navigate("/register")}>Зарегистрируйтесь</a></span>
      </div>
    </>
  )
}

function LoginForm() {
  const navigate = useNavigate();

  async function handleLogin(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const payload = {
      login: formData.get("login"),
      password: formData.get("password")
    };

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload)
    });

    const status = res.status;
    const data = await res.json();

    console.log(status, data);

    if (status === 200 && data.passed) navigate("/profile");
    else if (status === 401 || !data.passed) e.target.reset();
  }

  return (
    <form onSubmit={handleLogin} className={styles.loginForm}>
      <div><input className={styles.formInputEmail} type="text" name="login" id="login" placeholder="Ваша эл. почта" required /></div>
      <div><input className={styles.formInputPassword} type="password" name="password" id="password" placeholder="Ваш пароль" required /></div>
      <button className={styles.loginButton}>Войти</button>
    </form>
  )
}

export default function Login() {

  // useEffect(() => {
  //   const redirectIfAuthorised = async () => {
  //     const currentUser = await get("current_user");
  //     if (currentUser) navigate("/profile/settings");
  //   }
  //   redirectIfAuthorised()
  // }, [])

  return (
    <>
      <Header />
      <main className={styles.mainBlock}>
        <FormHeader />
        <LoginForm />
      </main>
    </>
  )
}