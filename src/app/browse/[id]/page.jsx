
// import { getRecipeId } from '@/lib/api';
// import React from 'react';
// const RecipeDetailsPage = async ({ params }) => {
//     const {id} = await params;
//     const recipe = await getRecipeId(id)

//     return (
//         <div className="p-10">
            
       
//         </div>
//     );
// };

// export default RecipeDetailsPage;

import { getRecipeId } from '@/lib/api';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BiTime, BiStar, BiChevronLeft, BiHeart } from 'react-icons/bi';
import { TbChefHat } from 'react-icons/tb';
import { notFound } from 'next/navigation';

const RecipeDetailsPage = async ({ params }) => {
    const { id } = await params;
    const recipe = await getRecipeId(id);

    // If no recipe is found, return the Next.js 404 page
    if (!recipe) {
        notFound();
    }

    // Map your MongoDB fields
    const {
        recipeName,
        recipeImage,
        category,
        difficultyLevel,
        preparationTime,
        ingredients = [],
        instructions = [],
        authorName,
        likesCount
    } = recipe;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                
                {/* Back Button */}
                <div className="p-6">
                    <Link href="/browse" className="inline-flex items-center text-gray-500 hover:text-emerald-600 font-medium">
                        <BiChevronLeft className="text-xl" /> Back to Browse
                    </Link>
                </div>

                {/* Hero Section */}
                <div className="relative h-80 md:h-96 w-full">
                    <Image unoptimized
                        src={recipeImage || "/placeholder-recipe.jpg"} 
                        alt={recipeName}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Header Content */}
                <div className="p-8 md:p-12">
                    <div className="flex justify-between items-start mb-4">
                        <span className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-bold">
                            {category}
                        </span>
                        <div className="flex items-center gap-2 text-rose-600 font-bold">
                            <BiHeart /> {likesCount || 0}
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">{recipeName}</h1>

                    {/* Metadata */}
                    <div className="flex flex-wrap gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-100">
                        <div className="flex items-center gap-2"><TbChefHat className="text-2xl text-emerald-600" /> By {authorName}</div>
                        <div className="flex items-center gap-2"><BiTime className="text-2xl text-emerald-600" /> {preparationTime} mins</div>
                        <div className="flex items-center gap-2"><BiStar className="text-2xl text-emerald-600" /> {difficultyLevel}</div>
                    </div>

                    {/* Ingredients & Instructions */}
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Ingredients</h3>
                            <ul className="space-y-3">
                                {ingredients.map((ing, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-700">
                                        <span className="w-2 h-2 mt-2 rounded-full bg-emerald-500" />
                                        {ing}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Instructions</h3>
                            <ol className="space-y-6">
                                {instructions.map((step, i) => (
                                    <li key={i} className="flex gap-4">
                                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gray-100 font-bold text-emerald-700 rounded-full text-sm">
                                            {i + 1}
                                        </span>
                                        <p className="text-gray-700 leading-relaxed">{step}</p>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetailsPage;