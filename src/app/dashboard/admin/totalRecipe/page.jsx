
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import RecipeActions from './RecipeActions';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import { Pagination } from '@heroui/react';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const LIMIT = 12;

const TotalRecipePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${baseURL}/api/recipes?page=${currentPage}&limit=${LIMIT}`);
        if (!res.ok) throw new Error('Failed to fetch recipes');
        const data = await res.json();

        if (!ignore) {
          setRecipes(data?.recipes ?? []);
          setTotalPages(data?.totalPages ?? 1);
        }
      } catch (err) {
        console.error('Failed to load recipes:', err);
        if (!ignore) {
          setRecipes([]);
          setTotalPages(1);
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };

    load();

    return () => {
      ignore = true;
    };
  }, [currentPage]);

  return (
    <div className="p-8 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold dark:text-gray-100">
          Manage Recipes 🍲
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Feature recipes or remove them from the platform
        </p>
      </div>

      <div className="rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-200">
              <th className="p-4 text-xs font-semibold capitalize text-gray-700 dark:text-gray-300">Recipe</th>
              <th className="p-4 text-xs font-semibold capitalize text-gray-700 dark:text-gray-300">Author</th>
              <th className="p-4 text-xs font-semibold capitalize text-gray-700 dark:text-gray-300">Category</th>
              <th className="p-4 text-xs font-semibold capitalize text-gray-700 dark:text-gray-300">Likes</th>
              <th className="p-4 text-xs font-semibold capitalize text-gray-700 dark:text-gray-300">Featured</th>
              <th className="p-4 text-xs font-semibold capitalize text-gray-700 dark:text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-sm text-gray-500 dark:text-gray-400">
                  Loading recipes...
                </td>
              </tr>
            ) : recipes.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-sm text-gray-500 dark:text-gray-400">
                  No recipes found.
                </td>
              </tr>
            ) : (
              recipes.map((recipe) => (
                <tr key={recipe._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <Image unoptimized
                      src={recipe.recipeImage || 'https://via.placeholder.com/60'}
                      alt={recipe.title || 'Recipe'}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <span className="font-semibold text-sm">
                      {recipe.recipeName || 'Untitled Recipe'}
                    </span>
                  </td>
                  <td className="p-4 text-sm">
                    {recipe.authorName || 'Unknown'}
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-600 border border-orange-100 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/30">
                      {recipe.category || 'Uncategorized'}
                    </span>
                  </td>
                  <td className="p-4 text-sm font-medium flex items-center gap-1 mt-2 text-gray-500 dark:text-gray-300">
                    <span className="text-red-500">❤️</span> {recipe.likes || 0}
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      recipe.isFeatured
                        ? 'bg-purple-50 text-purple-600 border border-purple-100 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/30'
                        : 'bg-gray-100 text-gray-500 border border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700'
                    }`}>
                      {recipe.isFeatured ? '⭐ Featured' : 'Regular'}
                    </span>
                  </td>
                  <td className="p-4">
                    <RecipeActions
                      recipeId={recipe._id}
                      isFeatured={recipe.isFeatured || false}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* HeroUI Pagination Controls */}
      {!isLoading && totalPages > 1 && (
        <div className="mt-12 pt-6 border-t border-gray-100 dark:border-gray-800">
          <Pagination className="justify-end">
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous
                  isDisabled={currentPage === 1}
                  onPress={() => setCurrentPage((p) => p - 1)}
                  className="text-gray-700 dark:text-gray-300 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40"
                >
                  <Pagination.PreviousIcon>
                    <FaLongArrowAltLeft />
                  </Pagination.PreviousIcon>
                  <span>Back</span>
                </Pagination.Previous>
              </Pagination.Item>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Pagination.Item key={p}>
                  <Pagination.Link
                    isActive={p === currentPage}
                    onPress={() => setCurrentPage(p)}
                    className={
                      p === currentPage
                        ? 'bg-orange-500 text-white border-orange-500'
                        : 'text-gray-700 dark:text-gray-300 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800'
                    }
                  >
                    {p}
                  </Pagination.Link>
                </Pagination.Item>
              ))}

              <Pagination.Item>
                <Pagination.Next
                  isDisabled={currentPage === totalPages}
                  onPress={() => setCurrentPage((p) => p + 1)}
                  className="text-gray-700 dark:text-gray-300 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40"
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
  );
};

export default TotalRecipePage;