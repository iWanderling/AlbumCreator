import { useState, useEffect, useRef } from "react"
import styles from "./Settings.module.css"
import { get, set, del, entries } from "idb-keyval"
import { useNavigate } from "react-router-dom";


function PersonalData() {

  const [currentEmail, setCurrentEmail] = useState<string>();
  const [currentName, setCurrentName] = useState<string>();
  const [currentSurname, setCurrentSurname] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {

    let getEmail = async () => {
      const email = await get("current_user");
      const userData = await get(email);
      console.log(email);

      if (userData) {
        setCurrentName(userData.name);
        setCurrentSurname(userData.surname);
        setCurrentEmail(email);
      }
    };

    getEmail();
  }, [])

  // Data changing
  const handleChanges = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const surname = formData.get("surname");
    const email = formData.get("email");

    if (typeof email === "string") {
      const isEmailExisted = await get(email);
      const currentUserEmail: string | undefined = await get("current_user");
      if (currentUserEmail && !isEmailExisted) {
        let currentUser = await get(currentUserEmail);
        currentUser = { ...currentUser, name: name, surname: surname };
        if (currentUserEmail !== email) {
          del(currentUserEmail);
          set("current_user", email);
        }
        if (typeof email === "string") set(email, currentUser);
      }
    }
  }

  return (
    <>
      <form className={styles.formData} onSubmit={handleChanges}>
        <div className={styles.formBlock}>
          <label className={styles.formLabel}>Ваше имя и фамилия</label>
          <div className={styles.formFullName}>
            <input className={styles.formDataInput} type="text" name="name" defaultValue={currentName} />
            <input className={styles.formDataInput} type="text" name="surname" defaultValue={currentSurname} />
          </div>
        </div>
        <div className={styles.formBlock}>
          <label className={styles.formLabel}>Ваш E-Mail</label>
          <input className={styles.formDataInput} type="email" name="email" defaultValue={currentEmail} />
        </div>
        <button className={styles.submitButton} type="submit" >Сохранить изменения</button>
      </form>
    </>
  )
}

function ChangePassword() {

  const [message, setMessage] = useState<string>();

  const handleForm = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentUser = await get("current_user");
    if (currentUser) {
      const currentUserData = await get(currentUser);
      const formData = new FormData(e.target);
      const oldP = formData.get("old");
      const newP = formData.get("new");
      if (oldP === currentUserData.password) {
        const repeatNewP = formData.get("repeat-new");
        if (newP === repeatNewP) {
          currentUserData.password = newP;
          set(currentUser, { ...currentUserData });
          setMessage("Пароль изменён!")
        }
        else {
          setMessage("Новый пароль указан неверно!")
        }
      }
      else {
        setMessage("Пароль указан неверно!")
      }
    }
  }

  return (
    <>
      <form className={styles.formData} onSubmit={handleForm}>
        <div className={styles.formBlock}>
          <label className={styles.formLabel}>Ваш старый пароль</label>
          <input className={styles.formPasswordInput} type="password" name="old" />
        </div>
        <div className={styles.formBlock}>
          <label className={styles.formLabel}>Ваш новый пароль</label>
          <input className={styles.formPasswordInput} type="password" name="new" />
        </div>
        <div className={styles.formBlock}>
          <label className={styles.formLabel}>Повторите новый пароль</label>
          <input className={styles.formPasswordInput} type="password" name="repeat-new" />
        </div>
        <button className={styles.submitButton}>Сохранить изменения</button>
        <div className={styles.passwordMessage}>{message}</div>
      </form>
    </>
  )
}

function Avatar() {

  const [image, setImage] = useState<string>();
  const inputfRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const downloadAvatar = async () => {
      const currentUserEmail = await get("current_user");
      if (currentUserEmail) {
        const currentUser = await get(currentUserEmail);
        const userAvatar = currentUser.avatar;
        if (userAvatar) setImage(URL.createObjectURL(currentUser.avatar));
      }
    }
    downloadAvatar();
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = Array.from(e.target.files || [])[0];
    if (!file) return;
    const currentUserEmail = await get("current_user");
    if (currentUserEmail) {
      const currentUser = await get(currentUserEmail);
      set(currentUserEmail, {
        ...currentUser,
        avatar: file
      })
    }
    const fileURL = URL.createObjectURL(file);
    setImage(fileURL);
  }

  return (
    <>
      <form className={styles.avatarBlock} onSubmit={(e) => e.preventDefault()}>
        <img className={styles.avatar} src={image} />
        <input
          ref={inputfRef}
          onChange={handleFileChange}
          type="file"
          accept="image/*"
          multiple
          hidden />
        <button className={styles.avatarButton} onClick={() => { inputfRef.current?.click() }}>Загрузить фото</button>
      </form>
    </>
  )
}

export default function Settings() {

  const [activeSettings, setActiveSettings] = useState<boolean>(true);

  return (
    <>
      <main className={styles.mainBlock}>
        <div className={styles.settingsBlock}>
          <Avatar />
          <ul className={styles.navBlock}>
            <li className={styles.navItem}><a className={styles.navLink} onClick={() => setActiveSettings(true)}>Личные данные</a></li>
            <li className={styles.navItem}><a className={styles.navLink} onClick={() => setActiveSettings(false)}>Сменить пароль</a></li>
          </ul>
          {!activeSettings && <ChangePassword />}
          {activeSettings && <PersonalData />}
        </div>
      </main>
    </>
  )
}
