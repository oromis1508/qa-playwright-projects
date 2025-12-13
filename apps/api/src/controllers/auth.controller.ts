import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../db/prisma";
import { env } from "../config/env";

export async function register(req: Request, res: Response) {
  const { email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: { email, password: hashed },
    });

    res.status(201).json({ id: user.id, email: user.email });
  } catch {
    res.status(400).json({ message: "User already exists" });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
}
