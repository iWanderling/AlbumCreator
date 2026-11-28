import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import { register, login, authMiddleware } from "./controllers/authController.js"
import main from "./controllers/mainController.js";

const port = 5000;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://192.168.31.240:5173",
  credentials: true
}));

app.post("/api/register", register);
app.post("/api/login", login);
app.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({ id: 1 })
});
app.listen(port, () => main(port));