"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function PurchasedRecipesPage() {
  const { data: session, isPending } = authClient.useSession();

  const userId = session?.user?.id;

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isPending) return;

    if (!userId) {
    setTimeout(() => {
      setLoading(false);
    }, 0);
    return;
  }

    const fetchPurchasedRecipes = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/purchases`
        );

        const data = await res.json();

        console.log("Purchased Recipes:", data);

        if (data.success) {
          // Works whether backend returns recipes or purchases
          setRecipes(data.recipes || data.purchases || []);
        }
      } catch (error) {
        console.error("Failed to fetch purchased recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchasedRecipes();
  }, [userId, isPending]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg text-emerald-600"></span>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-3">
          Please login first.
        </h2>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">
          No Purchased Recipes
        </h2>

        <p className="text-gray-500 mt-2">
          You have not purchased any recipe yet.
        </p>

        <Link
          href="/allRecipes"
          className="inline-block mt-6 px-6 py-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
        >
          Browse Recipes
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* Heading */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Purchased Recipes
        </h1>

        <p className="text-gray-500 mt-1">
          Total Purchased:{" "}
          <span className="font-semibold text-emerald-600">
            {recipes.length}
          </span>
        </p>
      </div>

      {/* Table */}

      <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-md">

        <table className="table w-full">

          <thead className="bg-[#0F3040] text-white">

            <tr>

              <th>#</th>

              <th>Recipe</th>

              <th>Author</th>

              <th>Price</th>

              <th>Purchased On</th>
              <th>View Details</th>

            </tr>

          </thead>

          <tbody>

            {recipes.map((recipe, index) => (

              <tr
                key={recipe._id}
                className="hover:bg-emerald-50 transition duration-200"
              >

                <td className="font-semibold">
                  {index + 1}
                </td>

                <td>

                  <div className="flex items-center gap-4">

                   
                    <div>

                      <h2 className="font-semibold">
                        {recipe.recipeName}
                      </h2>

                    </div>

                  </div>

                </td>

                <td>
                  {recipe.authorName || "Unknown"}
                </td>

                <td>

                  <span className="font-bold text-emerald-600">
                    ${recipe.price}
                  </span>

                </td>
                <td>

                  {recipe.purchasedAt
                    ? new Date(recipe.purchasedAt).toLocaleDateString()
                    : "--"}

                </td>
<td><Link href={`/browse/${recipe.recipeId}`} className="inline-flex items-center justify-center bg-linear-to-r from-emerald-500 to-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:from-emerald-600 hover:to-green-800">
View Recipe
</Link></td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
}