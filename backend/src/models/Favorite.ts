import { Schema, model, Document, Types } from "mongoose";

export interface FavoriteDocument extends Document {
  user: Types.ObjectId;
  mealId: string;
  mealName: string;
  mealThumb: string;
  createdAt: Date;
}

const favoriteSchema = new Schema<FavoriteDocument>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  mealId: { type: String, required: true },
  mealName: { type: String, required: true },
  mealThumb: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

favoriteSchema.index({ user: 1, mealId: 1 }, { unique: true });

export const Favorite = model<FavoriteDocument>("Favorite", favoriteSchema);
