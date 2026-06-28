"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { BiPlus, BiTrash, BiSave } from "react-icons/bi";

export default function AddRecipePage() {
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);

  // Dynamic Input Handlers
  const addField = (setter, list) => setter([...list, ""]);
  const removeField = (setter, list, index) => setter(list.filter((_, i) => i !== index));
  const updateField = (setter, list, index, value) => {
    const newList = [...list];
    newList[index] = value;
    setter(newList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you will eventually call your API (e.g., authClient or fetch)
    alert("Recipe submitted! (Integrate ImgBB and Backend here)");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto bg-white p-8 rounded-2xl border border-gray-100 shadow-sm"
    >
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Recipe</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Recipe Name</label>
            <input required className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="e.g. Spicy Thai Curry" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Recipe Image URL</label>
            <input required className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="https://image-link.com" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Category</label>
            <select className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none">
              <option>Appetizer</option>
              <option>Main Course</option>
              <option>Dessert</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Cuisine Type</label>
            <input required className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="e.g. Italian" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Difficulty</label>
            <select className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none">
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Prep Time (mins)</label>
            <input type="number" required className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="30" />
          </div>
        </div>

        {/* Dynamic Ingredients */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700">Ingredients</label>
          {ingredients.map((ing, index) => (
            <div key={index} className="flex gap-2">
              <input value={ing} onChange={(e) => updateField(setIngredients, ingredients, index, e.target.value)} className="flex-1 p-3 border rounded-xl" placeholder="e.g. 2 tbsp Olive Oil" />
              <button type="button" onClick={() => removeField(setIngredients, ingredients, index)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl"><BiTrash /></button>
            </div>
          ))}
          <button type="button" onClick={() => addField(setIngredients, ingredients)} className="text-sm text-emerald-600 font-bold flex items-center gap-1">+ Add Ingredient</button>
        </div>

        {/* Dynamic Instructions */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700">Instructions</label>
          {instructions.map((inst, index) => (
            <div key={index} className="flex gap-2">
              <textarea value={inst} onChange={(e) => updateField(setInstructions, instructions, index, e.target.value)} className="flex-1 p-3 border rounded-xl" placeholder={`Step ${index + 1}`} rows="2" />
              <button type="button" onClick={() => removeField(setInstructions, instructions, index)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl"><BiTrash /></button>
            </div>
          ))}
          <button type="button" onClick={() => addField(setInstructions, instructions)} className="text-sm text-emerald-600 font-bold flex items-center gap-1">+ Add Step</button>
        </div>

        {/* Submit */}
        <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all">
          <BiSave className="text-xl" /> Save Recipe
        </button>
      </form>
    </motion.div>
  );
}