"use client";

import React from "react";
import { BiBookOpen, BiHeart, BiX, BiTime, BiGroup } from "react-icons/bi";

export default function ViewRecipeModal({ recipe, onClose }) {
  if (!recipe) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/60">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BiBookOpen className="text-blue-600 w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-gray-900">Recipe Details</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors text-gray-500"
            aria-label="Close"
          >
            <BiX className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">

          {/* Title + Status */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-xl font-bold text-gray-900 leading-snug">{recipe.recipeName || "Untitled Recipe"}</h3>
            <span className={`shrink-0 mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
              recipe.status === "active"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-amber-50 text-amber-700 border-amber-200"
            }`}>
              {recipe.status || "Active"}
            </span>
          </div>

          {/* Description */}
          {recipe.description && (
            <p className="text-sm text-gray-600 leading-relaxed">{recipe.description}</p>
          )}

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3">
            <InfoCard label="Category" value={recipe.category || "—"} />
            <InfoCard label="Difficulty" value={recipe.difficultyLevel || "—"} />
            <InfoCard
              label="Cook Time"
              value={recipe.preparationTime ? `${recipe.preparationTime} min` : "—"}
              icon={<BiTime className="w-4 h-4 text-gray-400" />}
            />
            <InfoCard
              label="Price"
              value={recipe.price ? `${recipe.price} $` : "—"}
              icon={<BiGroup className="w-4 h-4 text-gray-400" />}
            />
          </div>

          {/* Likes */}
          <div className="flex items-center gap-2 pt-1">
            <BiHeart className="text-rose-500 w-4 h-4" />
            <span className="text-sm text-gray-600">
              <span className="font-bold text-gray-900">{recipe.likesCount ?? "0"}</span> likes
            </span>
          </div>

          {/* Ingredients */}
          {recipe.ingredients && recipe.ingredients.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Ingredients</p>
              <ul className="space-y-1">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    {typeof ing === "string" ? ing : `${ing.name} — ${ing.amount}`}
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end bg-gray-50/40">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg text-sm font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

function InfoCard({ label, value, icon }) {
  return (
    <div className="bg-gray-50 rounded-xl px-4 py-3 flex flex-col gap-0.5">
      <p className="text-xs text-gray-400 font-medium">{label}</p>
      <div className="flex items-center gap-1.5">
        {icon}
        <p className="text-sm font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}