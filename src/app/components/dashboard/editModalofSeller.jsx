"use client";

import React, { useState } from "react";
import { BiEdit, BiX, BiSave, BiLoader } from "react-icons/bi";

export default function EditRecipeModal({ recipe, onClose, onSave }) {
  // 1. Initialize state directly from the recipe prop to prevent empty first renders
  const [form, setForm] = useState(() => ({
    recipeName: recipe?.recipeName || "",
    category: recipe?.category || "",
    difficultyLevel: recipe?.difficultyLevel || "",
    cookTime: recipe?.preparationTime || "",
    price: recipe?.price || "", // Added to initial state
    description: recipe?.description || "",
    status: recipe?.status || "active",
  }));

  
  const [prevRecipeId, setPrevRecipeId] = useState(recipe?._id);

  if (recipe?._id !== prevRecipeId) {
    setPrevRecipeId(recipe?._id);
    setForm({
      recipeName: recipe?.recipeName || "",
      category: recipe?.category || "",
      difficultyLevel: recipe?.difficultyLevel || "",
      cookTime: recipe?.preparationTime || "",
      price: recipe?.price || "",
      description: recipe?.description || "",
      status: recipe?.status || "active",
    });
  }

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  if (!recipe) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.recipeName.trim()) {
      setError("Recipe title is required.");
      return;
    }

    setIsSaving(true);
    try {
      await onSave(recipe._id, form);
      onClose();
    } catch (err) {
      setError("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/60">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <BiEdit className="text-emerald-600 w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-gray-900">Edit Recipe</h2>
          </div>
          <button
            onClick={onClose}
            disabled={isSaving}
            className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors text-gray-500 disabled:opacity-40"
            aria-label="Close"
          >
            <BiX className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-5 space-y-4 max-h-[60vh] overflow-y-auto">

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-2.5">
                {error}
              </div>
            )}

            {/* Title */}
            <Field label="Recipe Title" required>
              <input
                type="text"
                name="recipeName"
                value={form.recipeName}
                onChange={handleChange}
                placeholder="e.g. Spicy Mango Salad"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
              />
            </Field>

            {/* Category + Difficulty */}
            <div className="grid grid-cols-2 gap-3">
              <Field label="Category">
                <input
                  type="text"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="e.g. Salad"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
                />
              </Field>
              <Field label="Difficulty">
                <select
                  name="difficultyLevel"
                  value={form.difficultyLevel}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition bg-white"
                >
                  <option value="">Select…</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </Field>
            </div>

            {/* Cook Time + Price */}
            <div className="grid grid-cols-2 gap-3">
              <Field label="Cook Time (min)">
                <input
                  type="number"
                  name="cookTime"
                  value={form.cookTime}
                  onChange={handleChange}
                  placeholder="30"
                  min="0"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
                />
              </Field>
              <Field label="Price">
                <input
                  type="number"
                  name="price"  
                  value={form.price}
                  onChange={handleChange}
                  placeholder="4"
                  min="1"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
                />
              </Field>
            </div>

            {/* Status */}
            <Field label="Status">
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition bg-white"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="draft">Draft</option>
              </select>
            </Field>

            {/* Description */}
            <Field label="Description">
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                placeholder="A short description of the recipe…"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition resize-none"
              />
            </Field>

          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-2 bg-gray-50/40">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-5 py-2 rounded-lg text-sm font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors disabled:opacity-40"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2 rounded-lg text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors disabled:opacity-60 flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <BiLoader className="animate-spin w-4 h-4" />
                  Saving…
                </>
              ) : (
                <>
                  <BiSave className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}