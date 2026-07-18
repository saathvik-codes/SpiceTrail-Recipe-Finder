"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FavoriteRecord, listFavorites, removeFavorite } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function FavoritesPage() {
  const { token } = useAuth();
  const router = useRouter();
  const [favorites, setFavorites] = useState<FavoriteRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }
    listFavorites(token)
      .then(setFavorites)
      .finally(() => setLoading(false));
  }, [token, router]);

  async function onRemove(mealId: string) {
    if (!token) return;
    await removeFavorite(token, mealId);
    setFavorites((prev) => prev.filter((f) => f.mealId !== mealId));
  }

  if (loading) return <p className="text-neutral-500">Loading favorites…</p>;

  if (favorites.length === 0) {
    return <p className="text-neutral-500">No favorites saved yet. Go find a recipe you love!</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {favorites.map((fav) => (
        <div key={fav._id} className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
          <Link href={`/recipe/${fav.mealId}`} className="block">
            <div className="relative aspect-square w-full">
              <Image src={fav.mealThumb} alt={fav.mealName} fill className="object-cover" />
            </div>
          </Link>
          <div className="flex items-center justify-between p-3">
            <h3 className="line-clamp-1 text-sm font-semibold">{fav.mealName}</h3>
            <button
              onClick={() => onRemove(fav.mealId)}
              className="text-xs text-red-600 hover:underline"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
