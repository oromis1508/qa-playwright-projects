import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { env } from "../config/env";

export function auth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: "No token" });
  }

  const [, token] = header.split(" ");

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as { userId: number };
    req.userId = payload.userId;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}
