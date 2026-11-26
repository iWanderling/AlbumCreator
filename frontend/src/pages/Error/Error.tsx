import styles from "./Error.module.css"
import { useNavigate } from "react-router-dom"
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

export default function Error() {

  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className={styles.error}>
        <div className={styles.errorMessage}>
          Такой страницы не существует
        </div>
        <button className={styles.mainButton} onClick={() => { navigate('/') }}>
          Вернуться на главную
        </button>
      </div>
      <Footer />
    </>
  )
}