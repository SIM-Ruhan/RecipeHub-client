
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
import { 
    BiTime, 
    BiStar, 
    BiChevronLeft, 
    BiHeart, 
    BiBookmark, 
    BiFlag,
    BiCreditCard
} from 'react-icons/bi';
import { TbChefHat } from 'react-icons/tb';
import { notFound } from 'next/navigation';

const RecipeDetailsPage = async ({ params }) => {
    const { id } = await params;
    const recipe = await getRecipeId(id);

    if (!recipe) {
        notFound();
    }

    const {
        recipeName,
        recipeImage,
        category,
        difficultyLevel,
        preparationTime,
        ingredients = [],
        instructions = [],
        authorName,
        likesCount,
        price = "00",
    } = recipe;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                
                {/* Back Button */}
                <div className="p-6">
                    <Link href="/browse" className="inline-flex items-center text-gray-500 hover:text-emerald-600 font-medium transition-colors">
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

                {/* Header & Action Panel */}
                <div className="p-8 md:p-12">
                    
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
                        {/* Title and Category */}
                        <div className="flex-1">
                            <span className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-bold inline-block mb-4">
                                {category}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                                {recipeName}
                            </h1>
                        </div>

                        {/* Interactive Action Panel */}
                        {/* Note: When implementing functionality, wrap this block in a Client Component */}
                        <div className="w-full md:w-auto flex flex-col gap-3 min-w-[240px] bg-gray-50 p-4 rounded-2xl border border-gray-100">
                            
                            {/* Purchase Button */}
                            <form action="/api/checkout_sessions" method="POST">
  <input type="hidden" name="plan_id" value={"seller_starter"}/>
      <section>
        <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all">
                                <BiCreditCard className="text-xl" /> ${price} (Buy Now)
                            </button>
      </section>
    </form>
                            {/* <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all">
                                <BiCreditCard className="text-xl" /> Buy Recipe - ${price}
                            </button> */}
                            
                            <div className="flex items-center justify-between gap-2">
                                {/* Like Button */}
                                <button className="flex-1 flex items-center justify-center gap-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 py-2.5 rounded-xl font-semibold transition-colors">
                                    <BiHeart className="text-lg" /> {likesCount || 0}
                                </button>
                                
                                {/* Favorite Button */}
                                <button className="flex-1 flex items-center justify-center gap-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 py-2.5 rounded-xl font-semibold transition-colors">
                                    <BiBookmark className="text-lg" /> Save
                                </button>
                                
                                {/* Report Button */}
                                <button 
                                    className="flex items-center justify-center bg-gray-200 text-gray-500 hover:bg-red-100 hover:text-red-600 p-3 rounded-xl transition-colors"
                                    title="Report this recipe"
                                >
                                    <BiFlag className="text-lg" />
                                </button>
                            </div>
                        </div>
                    </div>

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
                                        <span className="w-2 h-2 mt-2 rounded-full bg-emerald-500 shrink-0" />
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