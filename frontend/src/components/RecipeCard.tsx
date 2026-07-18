import Image from "next/image";
import Link from "next/link";
import { MealSummary } from "@/lib/mealdb";

export function RecipeCard({ meal }: { meal: MealSummary }) {
  return (
    <Link
      href={`/recipe/${meal.idMeal}`}
      className="group overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={meal.strMealThumb}
          alt={meal.strMeal}
          fill
          className="object-cover transition group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>
      <div className="p-3">
        <h3 className="line-clamp-2 text-sm font-semibold">{meal.strMeal}</h3>
      </div>
    </Link>
  );
}
