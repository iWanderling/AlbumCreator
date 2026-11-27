import express from "express"
import Database from "better-sqlite3"

const app = express();
const port = 3000;
app.use(express.json());

const db = Database("info.db");
db.pragma("foreign_keys=ON");

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    login TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    avatar TEXT,
    name TEXT NOT NULL,
    surname TEXT )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS albums (
    album_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS images (
  image_id INTEGER PRIMARY KEY AUTOINCREMENT,
  source TEXT NOT NULL,
  album_id INTEGER NOT NULL,
  FOREIGN KEY (album_id) REFERENCES albums(album_id) ON DELETE CASCADE )
`);

// Registration POST Handler
app.post("/api/register", (request, response) => {
  const { login, email, password, name, surname, avatar } = request.body;
  try {
    const stmt = db.prepare(`
    INSERT INTO users (login, email, password, avatar, name, surname)
    VALUES (?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(login, email, password, avatar, name, surname);
    response.status(201).json({
      login: login
    })
  }
  catch (error) {
    response.status(400).json({ error });
  }
});

app.post("/api/login", (request, response) => {
  const { login, password } = request.body;

  try {
    const stmt = db.prepare(`
      SELECT login, password FROM users WHERE login = ?
      `);
    const info = stmt.get(login);
    
    // Finished here (handle login and create good/bad responses)
    response.status(201).json({
      ok: true
    })
  }
  catch (error) {
    response.status(400).json({
      error
    })
  }
})

app.listen(port, () => {
  console.log(`PORT: ${port}`);
});