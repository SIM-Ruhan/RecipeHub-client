import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BiTime, BiStar, BiHeart } from 'react-icons/bi';
import { TbChefHat, TbTagStarred } from 'react-icons/tb';

const getFeaturedRecipes = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes?limit=100`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    const allRecipes = data?.recipes || [];
    return allRecipes.filter(recipe => recipe.isFeatured === true);
  } catch (error) {
    console.error("Failed fetching featured recipes:", error);
    return [];
  }
};

const FeaturedRecipesPage = async () => {
  const featuredRecipes = await getFeaturedRecipes();

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Title Section */}
        <div className="mb-10 flex flex-col items-center md:text-left">
          <h1 className="md:text-5xl text-3xl flex items-center font-extrabold tracking-tight">
         Featured Recipes <TbTagStarred />
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Handpicked culinary masterpieces highly recommended by our curators.
          </p>
        </div>

        {featuredRecipes.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <p className="text-gray-400 text-lg font-medium">No recipes have been featured yet.</p>
            <p className="text-gray-400 text-xs mt-1">Admin featured items will propagate here automatically.</p>
          </div>
        ) : (
          /* Cards Layout Grid Grid matching your context structure */
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredRecipes.map((recipe) => {
              // Normalize keys safely mapping to both your DB layout and details parameters
              const id = recipe._id;
              const name = recipe.recipeName || recipe.title || "Untitled Recipe";
              const img = recipe.recipeImage || recipe.image || "/placeholder-recipe.jpg";
              const category = recipe.category || "General";
              const author = recipe.authorName || "Chef Spec";
              const time = recipe.preparationTime || recipe.prepTime || "20";
              const difficulty = recipe.difficultyLevel || "Medium";
              const likes = recipe.likesCount || recipe.likes || 0;
              const price = recipe.price || "00";

              return (
                <div 
                  key={id} 
                  className="group rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  {/* Image Aspect Wrapper Container */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image 
                      unoptimized
                      src={img} 
                      alt={name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-emerald-700 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                      {category}
                    </span>
                    {price !== "00" && (
                      <span className="absolute top-3 right-3 bg-emerald-600 text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm">
                        ${price}
                      </span>
                    )}
                  </div>

                  {/* Info Wrapper Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Author Meta Row */}
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2 font-medium">
                        <TbChefHat className="text-emerald-600 text-sm" />
                        <span>by {author}</span>
                      </div>

                      {/* Title Heading */}
                      <h3 className="font-bold text-base line-clamp-1 group-hover:text-emerald-600 transition-colors mb-3">
                        {name}
                      </h3>

                      {/* Horizontal Specification Matrix Row */}
                      <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mb-5 pb-4 border-b border-gray-50">
                        <div className="flex items-center gap-1">
                          <BiTime className="text-gray-400 text-base" />
                          <span>{time}m</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BiStar className="text-gray-400 text-base" />
                          <span>{difficulty}</span>
                        </div>
                        <div className="flex items-center gap-1 ml-auto text-rose-600 font-semibold">
                          <BiHeart className="text-base" />
                          <span>{likes}</span>
                        </div>
                      </div>
                    </div>

                    {/* View Details Target CTA Anchor Link */}
                    <Link 
                      href={`/browse/${id}`}
                      className="w-full text-center bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors border border-gray-100 hover:border-emerald-200"
                    >
                      View Recipe
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedRecipesPage;