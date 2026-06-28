"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { BiTrash, BiSave } from "react-icons/bi";
import toast from "react-hot-toast";
import { CreateRecipe } from "@/lib/actions/recipe";



export default function AddRecipePage() {
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);

  // Dynamic Input Handlers
  const addField = (setter, list) => setter([...list, ""]);

  const removeField = (setter, list, index) => {
    if (list.length === 1) return;
    setter(list.filter((_, i) => i !== index));
  };

  const updateField = (setter, list, index, value) => {
    const newList = [...list];
    newList[index] = value;
    setter(newList);
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const newRecipeData = {
      title: formData.get("title"),
      image: formData.get("image"),
      category: formData.get("category"),
      cuisine: formData.get("cuisine"),
      difficulty: formData.get("difficulty"),
      prepTime: Number(formData.get("prepTime")),
      ingredients: ingredients.filter((item) => item.trim() !== " "),
      instructions: instructions.filter((item) => item.trim() !== " "),
    };

    try {
      const res = await CreateRecipe(newRecipeData);

      if (res?.insertedId || res?.success) {
        toast.success("Recipe submitted successfully!");
        form.reset();
        setIngredients([""]);
        setInstructions([""]);
      } else {
        toast.error("Failed to submit recipe.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto bg-white p-8 rounded-2xl border border-gray-100 shadow-sm"
    >
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Create New Recipe
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recipe Name */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Recipe Name
            </label>
            <input
              name="title"
              required
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="e.g. Spicy Thai Curry"
            />
          </div>

          {/* Image */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Recipe Image URL
            </label>
            <input
              name="image"
              required
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="https://image-link.com"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Category
            </label>
            <select
              name="category"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="Appetizer">Appetizer</option>
              <option value="Main Course">Main Course</option>
              <option value="Dessert">Dessert</option>
            </select>
          </div>

          {/* Cuisine */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Cuisine Type
            </label>
            <input
              name="cuisine"
              required
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="e.g. Italian"
            />
          </div>

          {/* Difficulty */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Difficulty
            </label>
            <select
              name="difficulty"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Prep Time */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Prep Time (mins)
            </label>
            <input
              name="prepTime"
              type="number"
              required
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="30"
            />
          </div>
        </div>

        {/* Ingredients */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700">
            Ingredients
          </label>

          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-2">
              <input
                value={ingredient}
                onChange={(e) =>
                  updateField(
                    setIngredients,
                    ingredients,
                    index,
                    e.target.value
                  )
                }
                className="flex-1 p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder={`Ingredient ${index + 1}`}
              />

              <button
                type="button"
                onClick={() =>
                  removeField(setIngredients, ingredients, index)
                }
                className="p-3 text-red-500 hover:bg-red-50 rounded-xl"
              >
                <BiTrash />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => addField(setIngredients, ingredients)}
            className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
          >
            + Add Ingredient
          </button>
        </div>

        {/* Instructions */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700">
            Instructions
          </label>

          {instructions.map((instruction, index) => (
            <div key={index} className="flex gap-2">
              <textarea
                rows={2}
                value={instruction}
                onChange={(e) =>
                  updateField(
                    setInstructions,
                    instructions,
                    index,
                    e.target.value
                  )
                }
                className="flex-1 p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder={`Step ${index + 1}`}
              />

              <button
                type="button"
                onClick={() =>
                  removeField(setInstructions, instructions, index)
                }
                className="p-3 text-red-500 hover:bg-red-50 rounded-xl"
              >
                <BiTrash />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => addField(setInstructions, instructions)}
            className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
          >
            + Add Step
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all"
        >
          <BiSave className="text-xl" />
          Save Recipe
        </button>
      </form>
    </motion.div>
  );
}