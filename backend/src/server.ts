import express from "express"
import Database from "better-sqlite3"


const app = express();
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!');
  console.log("123");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})