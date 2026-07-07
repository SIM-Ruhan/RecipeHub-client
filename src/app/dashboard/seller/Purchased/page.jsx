// app/seller/Purchased/page.jsx
'use client';

import RecipeCard from '@/app/components/RecipeCard';
import { useState, useEffect } from 'react';
import { BiReceipt } from 'react-icons/bi';

export default function PurchasedPage() {
  const [purchases, setPurchases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Replace with your actual API call
    const fetchPurchases = async () => {
      try {
        const res = await fetch('/api/user/purchases');
        const data = await res.json();
        setPurchases(data);
      } catch (error) {
        console.error("Failed to load purchases", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPurchases();
  }, []);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
          <BiReceipt className="text-2xl" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Purchased Recipes</h1>
          <p className="text-sm text-slate-500">Premium recipes you have unlocked.</p>
        </div>
      </div>

      {isLoading ? (
        <p className="text-slate-400">Loading your purchases...</p>
      ) : purchases.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-100">
          <p className="text-slate-500">You have not purchased any recipes yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {purchases.map((recipe) => (
            <RecipeCard 
              key={recipe._id || recipe.id} 
              recipe={recipe} 
              // Crucial: Hides the delete button for purchases
              showDelete={false} 
            />
          ))}
        </div>
      )}
    </div>
  );
}