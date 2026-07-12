
// import { serverFetch } from '@/lib/core/server';
// import React from 'react';


//  const getRecipes = async() => {
//   return serverFetch("/api/recipes");
// }


// const totalRecipepage = async() => {
//     const totalRecipe = await getRecipes()
//     return (
//         <div>
//             Total : {totalRecipe.length}
//         </div>
//     );
// };

// export default totalRecipepage;

// app/dashboard/admin/totalRecipes/page.jsx
import React from 'react';
import Image from 'next/image';
import RecipeActions from './RecipeActions';
import { serverFetch } from '@/lib/core/server';

 const getRecipes = async() => {
  return serverFetch("/api/recipes");
}

const TotalRecipePage = async () => {
  const recipes = await getRecipes();

  return (
    <div className="p-8 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Manage Recipes 🍲</h1>
        <p className="text-sm text-gray-500">Feature recipes or remove them from the platform</p>
      </div>

      <div className="rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="p-4 text-xs font-semibold capitalize">Recipe</th>
              <th className="p-4 text-xs font-semibold capitalize">Author</th>
              <th className="p-4 text-xs font-semibold capitalize">Category</th>
              <th className="p-4 text-xs font-semibold capitalize">Likes</th>
              <th className="p-4 text-xs font-semibold capitalize">Featured</th>
              <th className="p-4 text-xs font-semibold capitalize">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {recipes.map((recipe) => (
              <tr key={recipe._id} className="hover:bg-gray-50/50 transition-colors">
                {/* Recipe Image & Title */}
                <td className="p-4 flex items-center gap-3">
                  <Image unoptimized
                    src={recipe.recipeImage || 'https://via.placeholder.com/60'}
                    alt={recipe.title || 'Recipe'}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <span className="font-semibold text-sm">
                    {recipe.recipeName || 'Untitled Recipe'}
                  </span>
                </td>

                {/* Author */}
                <td className="p-4 text-sm">
                  {recipe.authorName || 'Unknown'}
                </td>

                {/* Category Pill */}
                <td className="p-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-600 border border-orange-100">
                    {recipe.category || 'Uncategorized'}
                  </span>
                </td>

                {/* Likes */}
                <td className="p-4 text-sm font-medium flex items-center gap-1 mt-2">
                  <span className="text-red-500">❤️</span> {recipe.likes || 0}
                </td>

                {/* Status Tag */}
                <td className="p-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    recipe.isFeatured 
                      ? 'bg-purple-50 text-purple-600 border border-purple-100'
                      : 'bg-gray-100 text-gray-500 border border-gray-200'
                  }`}>
                    {recipe.isFeatured ? '⭐ Featured' : 'Regular'}
                  </span>
                </td>

                {/* Actions (Client Component) */}
                <td className="p-4">
                  <RecipeActions 
                    recipeId={recipe._id} 
                    isFeatured={recipe.isFeatured || false} 
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TotalRecipePage;