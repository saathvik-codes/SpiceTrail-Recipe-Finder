import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import authRoutes from "./routes/authRoutes";
import favoriteRoutes from "./routes/favoriteRoutes";

export function createApp() {
  const app = express();

  app.use(cors({ origin: process.env.CORS_ORIGIN ?? "http://localhost:3000" }));
  app.use(express.json());

  app.get("/health", (_req, res) => res.json({ status: "ok" }));
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/favorites", favoriteRoutes);

  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  });

  return app;
}
