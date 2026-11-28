import type { Request, Response, NextFunction } from "express";
import db from "../db/database.js";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../env/env.js"

export function authMiddleware(req: any, res: Response, next: NextFunction) {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ message: "Нет доступа" });

  try {
    req.account = jwt.verify(token, JWT_KEY);
    next();
  } catch {
    res.status(401).json({ message: "Неправильный токен" });
  }
}

export function register(req: Request, res: Response) {
  const { login, email, password, name, surname, avatar } = req.body;
  try {
    const stmt = db.prepare(`
    INSERT INTO users (login, email, password, avatar, name, surname)
    VALUES (?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(login, email, password, avatar, name, surname);
    res.status(201).json({
      login: login
    })
  }
  catch (error) {
    res.status(400).json({ error });
  }
}

export function login(req: Request, res: Response) {
  const { login, password } = req.body;

  try {
    const stmt = db.prepare(`SELECT user_id, password FROM users WHERE login = ?`);
    const account: any = stmt.get(login);

    if (account && password === account.password) {
      const token = jwt.sign({ userId: account.user_id }, JWT_KEY, { expiresIn: '24h' });

      res.cookie('accessToken', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000
      });

      res.status(200).json(
        { passed: true }
      );
    }
    else {
      res.status(200).json(
        { passed: false }
      )
    }
  }

  catch (error) {
    console.log(error);
    res.status(400).json({
      error
    })
  }
}