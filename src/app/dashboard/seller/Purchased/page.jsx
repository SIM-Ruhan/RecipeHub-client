"use client";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import RecipeCard from "@/app/components/RecipeCard";

export default function PurchasesPage() {
  const { data: session, isPending } = authClient.useSession();
  const userId = session?.user?.id;
  const [recipes, setRecipes] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (isPending || !userId) return;
    const fetchPurchases = async () => {
      setFetching(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/purchases`
        );
        const data = await res.json();
        if (data.success) {
          setRecipes(data.recipes);
        }
      } catch (error) {
        console.error("Failed to fetch purchased recipes:", error);
      } finally {
        setFetching(false);
      }
    };
    fetchPurchases();
  }, [userId, isPending]);

  if (isPending) {
    return <div className="flex justify-center py-10">Loading session...</div>;
  }
  if (fetching) {
    return <div className="flex justify-center py-10">Loading purchased recipes...</div>;
  }
  if (!userId) {
    return <div className="text-center py-10 text-gray-500">Please log in first.</div>;
  }
  if (recipes.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        You have not purchased any recipes yet.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe._id} recipe={recipe} />
      ))}
    </div>
  );
}