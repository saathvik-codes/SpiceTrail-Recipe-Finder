"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { extractIngredients, getMealById, MealDetail } from "@/lib/mealdb";
import { addFavorite, removeFavorite } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function RecipeDetailPage() {
  const params = useParams<{ id: string }>();
  const { token } = useAuth();
  const [meal, setMeal] = useState<MealDetail | null>(null);
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    getMealById(params.id).then(setMeal);
  }, [params.id]);

  if (!meal) {
    return <p className="text-neutral-500">Loading recipe…</p>;
  }

  async function toggleFavorite() {
    if (!token || !meal) return;
    setBusy(true);
    try {
      if (saved) {
        await removeFavorite(token, meal.idMeal);
        setSaved(false);
      } else {
        await addFavorite(token, {
          mealId: meal.idMeal,
          mealName: meal.strMeal,
          mealThumb: meal.strMealThumb,
        });
        setSaved(true);
      }
    } finally {
      setBusy(false);
    }
  }

  const ingredients = extractIngredients(meal);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl">
        <Image src={meal.strMealThumb} alt={meal.strMeal} fill className="object-cover" />
      </div>
      <div>
        <h1 className="text-2xl font-bold">{meal.strMeal}</h1>
        <p className="mt-1 text-sm text-neutral-500">
          {meal.strCategory} · {meal.strArea}
        </p>

        {token && (
          <button
            onClick={toggleFavorite}
            disabled={busy}
            className="mt-4 rounded-lg bg-spice-600 px-4 py-2 text-sm font-medium text-white hover:bg-spice-700 disabled:opacity-50"
          >
            {saved ? "Remove from favorites" : "Save to favorites"}
          </button>
        )}

        <h2 className="mt-6 font-semibold">Ingredients</h2>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-neutral-700">
          {ingredients.map((item, idx) => (
            <li key={idx}>
              {item.measure} {item.ingredient}
            </li>
          ))}
        </ul>
      </div>

      <div className="md:col-span-2">
        <h2 className="font-semibold">Instructions</h2>
        <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-neutral-700">
          {meal.strInstructions}
        </p>
      </div>
    </div>
  );
}
