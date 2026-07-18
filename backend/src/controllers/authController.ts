import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

function signToken(userId: string): string {
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
}

export async function register(req: Request, res: Response) {
  const { name, email, password } = req.body ?? {};
  if (!name || !email || !password || password.length < 8) {
    return res.status(400).json({ message: "name, email and password (min 8 chars) are required" });
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    return res.status(409).json({ message: "Email already registered" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email: email.toLowerCase(), passwordHash });

  return res.status(201).json({
    token: signToken(user.id),
    user: { id: user.id, name: user.name, email: user.email },
  });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body ?? {};
  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  return res.json({
    token: signToken(user.id),
    user: { id: user.id, name: user.name, email: user.email },
  });
}
