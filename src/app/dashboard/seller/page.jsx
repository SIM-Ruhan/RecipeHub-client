"use client";

import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { motion } from "framer-motion";

// Icons
import { 
  BiHeart, 
  BiBookOpen, 
  BiTrendingUp,
} from "react-icons/bi";
import { HiOutlineArrowRight } from "react-icons/hi";
import { getCompanyRecipe } from "@/lib/api";
import ViewRecipeModal from "@/app/components/dashboard/viewModalofSeller";
import EditRecipeModal from "@/app/components/dashboard/editModalofSeller";
import DeleteRecipeModal from "@/app/components/dashboard/deleteModalofSeller";

export default function SellerDashboardHomepage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [recipes, setRecipes] = useState([]);
  const [isLoadingRecipes, setIsLoadingRecipes] = useState(true);

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [modalType, setModalType] = useState(null); // "view" | "edit" | "delete"
  
  const openModal = (recipe, type) => { setSelectedRecipe(recipe); setModalType(type); };
  const closeModal = () => { setSelectedRecipe(null); setModalType(null); };

  useEffect(() => {
    const fetchRecipes = async () => {
      // Ensure we only fetch if we have a valid user ID
      if (user?.id) {
        try {
          setIsLoadingRecipes(true);
          // UPDATED: Use user.id to match the authorId in your database
          const data = await getCompanyRecipe({
            authorId: user?.authorId, 
            status: "active",
          });
          
          // Defensively ensure data is an array
          setRecipes(Array.isArray(data) ? data : (data?.recipes || []));
        } catch (error) {
          console.error("Failed to fetch recipes:", error);
        } finally {
          setIsLoadingRecipes(false);
        }
      }
    };
    fetchRecipes();
  }, [user]);

  const handleSaveRecipe = async (id, updatedFields) => {
    // Standardize ID in case it comes back as an object from MongoDB
    const targetId = typeof id === 'object' && id?.$oid ? id.$oid : id;
    
    const res = await fetch(`/api/recipes/${targetId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFields),
    });
    if (!res.ok) throw new Error("Patch failed");

    // Optimistic update in local state
    setRecipes((prev) =>
      prev.map((r) => {
        const rId = typeof r._id === 'object' ? r._id.$oid : r._id;
        return rId === targetId ? { ...r, ...updatedFields } : r;
      })
    );
  };

  const handleDeleteRecipe = async (id) => {
    const targetId = typeof id === 'object' && id?.$oid ? id.$oid : id;
    
    const res = await fetch(`/api/recipes/${targetId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Delete failed");

    // Remove from local state
    setRecipes((prev) => prev.filter((r) => {
      const rId = typeof r._id === 'object' ? r._id.$oid : r._id;
      return rId !== targetId;
    }));
  };

  const stats = [
    { title: "Active Recipes", value: recipes.length || "0", icon: BiBookOpen, color: "text-blue-600",   bg: "bg-blue-100" },
    { title: "Total Favorites", value: "842",                icon: BiHeart,     color: "text-rose-600",  bg: "bg-rose-100" },
    { title: "Total Engagement", value: "3.2k",              icon: BiTrendingUp,color: "text-purple-600",bg: "bg-purple-100" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show:   { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show:   { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  if (isPending) {
    return (
      <div className="p-8 flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {modalType === "view" && (
        <ViewRecipeModal recipe={selectedRecipe} onClose={closeModal} />
      )}
      {modalType === "edit" && (
        <EditRecipeModal recipe={selectedRecipe} onClose={closeModal} onSave={handleSaveRecipe} />
      )}
      {modalType === "delete" && (
        <DeleteRecipeModal recipe={selectedRecipe} onClose={closeModal} onDelete={handleDeleteRecipe} />
      )}

      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name || "Chef"}! 👋
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Here is what is happening with your recipes today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/seller/add-recipe"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm"
          >
            + New Recipe
          </Link>
        </div>
      </div>

      {/* 2. Key Metrics Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            <div className={`p-4 rounded-xl ${stat.bg}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* 3. Dynamic Recipes Table */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
      >
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-900">My Recent Recipes</h2>
          <Link
            href="/dashboard/seller/products"
            className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            View All <HiOutlineArrowRight />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white text-xs uppercase tracking-wider text-gray-500 border-b border-gray-100">
                <th className="px-6 py-4 font-semibold">Recipe Name</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Difficulty</th>
                <th className="px-6 py-4 font-semibold text-right">Likes</th>
                <th className="px-6 py-4 font-semibold text-center">Status</th>
                <th className="px-6 py-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">

              {/* Loading */}
              {isLoadingRecipes ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center">
                    <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600" />
                  </td>
                </tr>
              ) : recipes.length > 0 ? (
                recipes.slice(0, 5).map((recipe, index) => {
                  // Standardize MongoDB object ID format safely
                  const safeId = typeof recipe._id === 'object' && recipe._id?.$oid ? recipe._id.$oid : recipe._id;
                  
                  return (
                    <tr key={safeId || index} className="hover:bg-gray-50/50 transition-colors">
                      {/* UPDATED: Mapped to database fields */}
                      <td className="px-6 py-4 text-sm font-bold text-gray-900">{recipe.recipeName || "Untitled"}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{recipe.category || "Uncategorized"}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{recipe.difficultyLevel || "N/A"}</td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-900 text-right">{recipe.likesCount || 0}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          recipe.status === "active"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}>
                          {recipe.status || "Active"}
                        </span>
                      </td>

                      {/* ── Action Buttons ── */}
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => openModal(recipe, "view")}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-colors"
                            title="View recipe"
                          >
                            View
                          </button>
                          <button
                            onClick={() => openModal(recipe, "edit")}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors"
                            title="Edit recipe"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => openModal(recipe, "delete")}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 transition-colors"
                            title="Delete recipe"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No recipes found yet. Keep sharing!
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      </motion.div>

    </div>
  );
}