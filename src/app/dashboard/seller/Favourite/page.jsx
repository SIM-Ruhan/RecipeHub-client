"use client";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import RecipeCard from "@/app/components/RecipeCard";

export default function FavoritesPage() {
  const { data: session, isPending } = authClient.useSession();
  const userId = session?.user?.id;
  const [recipes, setRecipes] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [removingId, setRemovingId] = useState(null); 

  useEffect(() => {
    if (isPending || !userId) return;
    const fetchFavorites = async () => {
      setFetching(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/favorites`
        );
        const data = await res.json();
        if (data.success) {
          setRecipes(data.recipes);
        }
      } catch (error) {
        console.error("Failed to fetch favorite recipes:", error);
      } finally {
        setFetching(false);
      }
    };
    fetchFavorites();
  }, [userId, isPending]);

  const handleRemoveFavorite = async (recipeId) => {
    // Optimistically remove from UI
    const prevRecipes = recipes;
    setRecipes((prev) => prev.filter((r) => r._id !== recipeId));
    setRemovingId(recipeId);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/favorites/${recipeId}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Failed to remove favorite");
    } catch (error) {
      console.error("Failed to remove favorite:", error);
      // Roll back on failure
      setRecipes(prevRecipes);
    } finally {
      setRemovingId(null);
    }
  };

  if (isPending) {
    return <div className="flex justify-center py-10">Loading session...</div>;
  }
  if (fetching) {
    return <div className="flex justify-center py-10">Loading favorite recipes...</div>;
  }
  if (!userId) {
    return <div className="text-center py-10 text-gray-500">Please log in first.</div>;
  }
  if (recipes.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        You have not saved any favorite recipes yet.
      </div>
    );
  }
  return (
    <div>
                <h1 className="text-4xl font-bold text-gray-700 py-5">Total Saved Recipes({recipes.length})</h1>
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {recipes.map((recipe) => (
        <div key={recipe._id} className="relative">
          <RecipeCard recipe={recipe} />
          <button
            onClick={() => handleRemoveFavorite(recipe._id)}
            disabled={removingId === recipe._id}
            className="absolute top-60 right-5 bg-red-100 hover:bg-red-50 text-red-600 rounded-xl px-4 py-2 shadow disabled:opacity-50"
            aria-label="Remove from favorites"
          >
            {removingId === recipe._id ? "…" : "Delete"}
          </button>
        </div>
      ))}
    </div></div>
  );
}