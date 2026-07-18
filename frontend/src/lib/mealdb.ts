export interface MealSummary {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface MealDetail extends MealSummary {
  strCategory: string;
  strArea: string;
  strInstructions: string;
  [key: `strIngredient${number}`]: string | undefined;
  [key: `strMeasure${number}`]: string | undefined;
}

const MEALDB_BASE = "https://www.themealdb.com/api/json/v1/1";

export async function searchMeals(query: string): Promise<MealSummary[]> {
  const res = await fetch(`${MEALDB_BASE}/search.php?s=${encodeURIComponent(query)}`);
  const data = await res.json();
  return data.meals ?? [];
}

export async function getMealById(id: string): Promise<MealDetail | null> {
  const res = await fetch(`${MEALDB_BASE}/lookup.php?i=${encodeURIComponent(id)}`);
  const data = await res.json();
  return data.meals?.[0] ?? null;
}

export function extractIngredients(meal: MealDetail): { ingredient: string; measure: string }[] {
  const items: { ingredient: string; measure: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      items.push({ ingredient: ingredient.trim(), measure: (measure ?? "").trim() });
    }
  }
  return items;
}
