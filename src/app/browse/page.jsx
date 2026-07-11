"use client";

import React, { useState, useEffect } from "react";
import { getRecipe } from '@/lib/api';
import RecipeCard from '../components/RecipeCard';

export default function BrowsePage() {
    const [allRecipes, setAllRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // Search & Filter States
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const data = await getRecipe();
                const recipes = Array.isArray(data) ? data : (data?.recipes || []);
                setAllRecipes(recipes);
            } catch (error) {
                console.error("Failed to fetch:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAll();
    }, []);

    // DERIVED STATE: Calculation happens during render, not in an effect
    const filteredRecipes = allRecipes.filter((recipe) => {
        const matchesSearch = recipe.recipeName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter === "All" || recipe.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const categories = ["All", ...new Set(allRecipes.map(r => r.category))];

    if (isLoading) return <div className="p-20 text-center">Loading recipes...</div>;

    return (
        <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                
                {/* Header Section */}
                <div className="max-w-7xl mx-auto mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                        Explore Culinary <span className="text-emerald-600">Delights</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover a world of flavors with our collection of handcrafted recipes from top chefs and home cooks around the globe.
                    </p>
                </div>

                {/* Search and Filter UI */}
                <div className="flex flex-col md:flex-row gap-4 mb-10 p-4 rounded-2xl shadow-sm border border-gray-100">
                    <input 
                        type="text" 
                        placeholder="Search recipes by name..." 
                        className="flex-1 p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <select 
                        className="p-3 rounded-xl border border-gray-200 outline-none"
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredRecipes.length > 0 ? (
                        filteredRecipes.map((recipe) => (
                            <RecipeCard key={recipe._id} recipe={recipe} />
                        ))
                    ) : (
                        <div className="col-span-full py-10 text-center text-gray-500">
                            No recipes found matching your criteria.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}