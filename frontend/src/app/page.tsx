"use client";

import { FormEvent, useState } from "react";
import { MealSummary, searchMeals } from "@/lib/mealdb";
import { RecipeCard } from "@/components/RecipeCard";

export default function HomePage() {
  const [query, setQuery] = useState("chicken");
  const [meals, setMeals] = useState<MealSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function onSearch(e: FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      const results = await searchMeals(query.trim());
      setMeals(results);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="mb-8 rounded-xl bg-gradient-to-r from-spice-500 to-spice-700 p-8 text-white">
        <h1 className="text-2xl font-bold">Find your next favorite recipe</h1>
        <p className="mt-1 text-spice-50">Search thousands of recipes by name, save the ones you love.</p>
        <form onSubmit={onSearch} className="mt-4 flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. pasta, chicken, curry"
            className="w-full rounded-lg border-0 px-4 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            className="rounded-lg bg-neutral-900 px-5 py-2 font-medium hover:bg-neutral-800"
          >
            Search
          </button>
        </form>
      </div>

      {loading && <p className="text-neutral-500">Searching…</p>}

      {!loading && searched && meals.length === 0 && (
        <p className="text-neutral-500">No recipes found for &ldquo;{query}&rdquo;.</p>
      )}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {meals.map((meal) => (
          <RecipeCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </div>
  );
}
