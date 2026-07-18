import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { addFavorite, listFavorites, removeFavorite } from "../controllers/favoriteController";

const router = Router();

router.use(requireAuth);
router.get("/", listFavorites);
router.post("/", addFavorite);
router.delete("/:mealId", removeFavorite);

export default router;
