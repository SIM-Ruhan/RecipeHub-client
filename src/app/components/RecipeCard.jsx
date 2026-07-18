import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BiTime, BiHeart, BiStar } from "react-icons/bi";
import { TbChefHat } from "react-icons/tb";

export default function RecipeCard({ recipe }) {
  if (!recipe) {
    return null;
  }

  // MAPPING: Database fields -> Card display variables
  const {
    _id,
    recipeName: title = "Untitled Recipe",
    recipeImage: image = "https://ui-avatars.com/api/?name=Recipe&background=f3f4f6&color=9ca3af",
    category = "Uncategorized",
    preparationTime: prepTime = 0,
    difficultyLevel: difficulty = "N/A",
    authorName = "Anonymous Chef",
    likesCount = 0,
    // Note: 'price' is not in your current DB structure, so we default to 0
    price = 0, 
  } = recipe;

  // Since your ID is nested in an object ($oid) from MongoDB
  const id = typeof _id === 'object' && _id?.$oid ? _id.$oid : _id;
  const recipeLink = `/recipe/${id}`;

  return (
    <div className="group rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
      
      {/* Image Header */}
      <div className="relative h-56 w-full overflow-hidden block">
        <Image unoptimized
          src={image}
          alt={title}
          width={600}
          height={400}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Floating Category Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-emerald-700 shadow-sm">
          {category}
        </div>
        {/* Floating Likes Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-rose-600 shadow-sm flex items-center gap-1">
          <BiHeart className="text-sm" /> {likesCount}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1">
        
        {/* Author Info */}
        <div className="flex items-center gap-2 mb-3 text-gray-500 text-xs font-medium">
          <TbChefHat className="text-emerald-600 text-base" />
          <span className="truncate">By {authorName}</span>
        </div>

        {/* Title */}
        <Link href={recipeLink}>
          <h3 className="text-lg font-bold leading-tight mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>

        {/* Meta Details (Time & Difficulty) */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 mt-auto pt-4">
          <div className="flex items-center gap-1.5">
            <BiTime className="text-gray-400" />
            <span>{prepTime} mins</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-gray-300"></div>
          <div className="flex items-center gap-1.5">
            <BiStar className="text-gray-400" />
            <span>{difficulty}</span>
          </div>
        </div>

        {/* Footer */}
        
          <Link 
            href={`/browse/${_id}`}
            className="bg-emerald-500 text-center hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            View Recipe
          </Link>
        </div>
      </div>
    
  );
}