// app/seller/likedRecipe/page.jsx
'use client';

import RecipeCard from '@/app/components/RecipeCard';
import { useState, useEffect } from 'react';
import { BiHeart } from 'react-icons/bi';

export default function LikedRecipesPage() {
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Replace with your actual API call
    const fetchLiked = async () => {
      try {
        const res = await fetch('/api/user/liked');
        const data = await res.json();
        setLikedRecipes(data);
      } catch (error) {
        console.error("Failed to load liked recipes", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLiked();
  }, []);

  const handleDelete = async (recipeId) => {
    setLikedRecipes(prev => prev.filter(recipe => (recipe._id || recipe.id) !== recipeId));
    try {
      await fetch(`/api/user/liked/${recipeId}`, { method: 'DELETE' });
    } catch (error) {
      console.error("Failed to unlike recipe", error);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-rose-50 text-rose-500 rounded-xl">
          <BiHeart className="text-2xl" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Liked Recipes</h1>
          <p className="text-sm text-slate-500">Recipes you've shown love to.</p>
        </div>
      </div>

      {isLoading ? (
        <p className="text-slate-400">Loading liked recipes...</p>
      ) : likedRecipes.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-100">
          <p className="text-slate-500">You haven't liked any recipes yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {likedRecipes.map((recipe) => (
            <RecipeCard 
              key={recipe._id || recipe.id} 
              recipe={recipe} 
              onDelete={handleDelete} 
              showDelete={true}
              // Optional: Customize hover/icon colors to match the "Like" theme
              deleteIconColor="text-rose-500" 
              deleteBgHover="hover:bg-rose-50"
            />
          ))}
        </div>
      )}
    </div>
  );
}