import styles from "./Footer.module.css"

export default function Footer() {
  return (
    <footer>
      <div className={styles.footerMain}>Нижняя часть</div>
      <div className={styles.footerBottom}>
        {/* <ul className={styles.menu}></ul> */}
      </div>
    </footer>
  )
}