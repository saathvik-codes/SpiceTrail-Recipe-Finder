import { Response } from "express";
import { Favorite } from "../models/Favorite";
import { AuthRequest } from "../middleware/auth";

export async function listFavorites(req: AuthRequest, res: Response) {
  const favorites = await Favorite.find({ user: req.userId }).sort({ createdAt: -1 });
  return res.json(favorites);
}

export async function addFavorite(req: AuthRequest, res: Response) {
  const { mealId, mealName, mealThumb } = req.body ?? {};
  if (!mealId || !mealName || !mealThumb) {
    return res.status(400).json({ message: "mealId, mealName and mealThumb are required" });
  }

  try {
    const favorite = await Favorite.create({ user: req.userId, mealId, mealName, mealThumb });
    return res.status(201).json(favorite);
  } catch (err: any) {
    if (err?.code === 11000) {
      return res.status(409).json({ message: "Recipe already in favorites" });
    }
    throw err;
  }
}

export async function removeFavorite(req: AuthRequest, res: Response) {
  const { mealId } = req.params;
  await Favorite.deleteOne({ user: req.userId, mealId });
  return res.status(204).send();
}
