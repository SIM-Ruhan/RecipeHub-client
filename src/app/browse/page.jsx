

"use client";

import React, { useState, useEffect } from "react";
import { getRecipe } from '@/lib/api';
import RecipeCard from '../components/RecipeCard';
import { Pagination } from "@heroui/react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";


const RECIPE_CATEGORIES = ["All", "Breakfast", "Lunch", "Dinner", "Dessert", "Snack", "Vegetarian"];

export default function BrowsePage() {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
   
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    

    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");

    // Debounce the search input
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    
    useEffect(() => {
        const fetchRecipes = async () => {
            setIsLoading(true);
            try {
                const params = { page: currentPage, limit: 12 };
                
                if (debouncedSearch) params.search = debouncedSearch;
                if (categoryFilter !== "All") params.category = categoryFilter;

                const data = await getRecipe(params); 
                
                setRecipes(data?.recipes || []);
                setTotalPages(data?.totalPages || 1);
            } catch (error) {
                console.error("Failed to fetch:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRecipes();
    }, [currentPage, debouncedSearch, categoryFilter]); 

    // Handle Search Changes
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); 
    };

    // Handle Category Changes
    const handleCategoryChange = (e) => {
        setCategoryFilter(e.target.value);
        setCurrentPage(1); 
    };

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
                        value={searchQuery}
                        placeholder="Search recipes by name..." 
                        className="flex-1 p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                        onChange={handleSearchChange} // Updated handler
                    />
                    <select 
                        value={categoryFilter}
                        className="p-3 rounded-xl border border-gray-200 outline-none"
                        onChange={handleCategoryChange} // Updated handler
                    >
                        {RECIPE_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>

                {/* Grid & Loader status */}
                {isLoading ? (
                    <div className="p-20 text-center text-gray-500">Loading recipes...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {recipes.length > 0 ? (
                            recipes.map((recipe) => (
                                <RecipeCard key={recipe._id} recipe={recipe} />
                            ))
                        ) : (
                            <div className="col-span-full py-10 text-center text-gray-500">
                                No recipes found matching your criteria.
                            </div>
                        )}
                    </div>
                )}

                {/* HeroUI Pagination Controls */}
                {!isLoading && totalPages > 1 && (
                    <div className="mt-12 pt-6 border-t border-gray-100">
                        <Pagination className="justify-end">
                          <Pagination.Content>
                            <Pagination.Item>
                              <Pagination.Previous 
                                isDisabled={currentPage === 1} 
                                onPress={() => setCurrentPage((p) => p - 1)}
                              >
                                <Pagination.PreviousIcon>
                                  <FaLongArrowAltLeft />
                                </Pagination.PreviousIcon>
                                <span>Back</span>
                              </Pagination.Previous>
                            </Pagination.Item>
                            
                            {Array.from({length: totalPages}, (_, i) => i + 1).map((p) => (
                              <Pagination.Item key={p}>
                                <Pagination.Link 
                                  isActive={p === currentPage} 
                                  onPress={() => setCurrentPage(p)}
                                >
                                  {p}
                                </Pagination.Link>
                              </Pagination.Item>
                            ))}
                            
                            <Pagination.Item>
                              <Pagination.Next 
                                isDisabled={currentPage === totalPages} 
                                onPress={() => setCurrentPage((p) => p + 1)}
                              >
                                <span>Forward</span>
                                <Pagination.NextIcon>
                               <FaLongArrowAltRight />
                                </Pagination.NextIcon>
                              </Pagination.Next>
                            </Pagination.Item>
                          </Pagination.Content>
                        </Pagination>
                    </div>
                )}
            </div>
        </div>
    );
}