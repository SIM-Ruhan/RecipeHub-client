"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import RecipeCard from "@/app/components/RecipeCard";

export default function LikedRecipesPage() {
  const { data: session, isPending } = authClient.useSession();

  const userId = session?.user?.id;

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait until session finishes loading
    if (isPending) return;

    // If no logged in user
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchLikedRecipes = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/liked-recipes`
        );

        const data = await res.json();

        console.log(data);

        if (data.success) {
          setRecipes(data.recipes);
        }
      } catch (error) {
        console.error("Failed to fetch liked recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedRecipes();
  }, [userId, isPending]);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        Loading...
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        You have not liked any recipes yet.
      </div>
    );
  }

  return (
    <div className="">
        <h1 className="text-4xl font-bold text-gray-700 py-5">Total Liked Recipes({recipes.length})</h1>
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe._id}
          recipe={recipe}
        />
      ))}
    </div></div>
  );
}