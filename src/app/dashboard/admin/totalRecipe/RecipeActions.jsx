
'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

export default function RecipeActions({ recipeId, isFeatured }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [loadingAction, setLoadingAction] = useState(null); // 'feature' or 'delete'
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleToggleFeature = async () => {
    if (loadingAction || isPending) return;
    setLoadingAction('feature');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes/${recipeId}/feature`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: !isFeatured }),
      });

      if (response.ok) {
        startTransition(() => {
          router.refresh();
        });
      }
    } catch (error) {
      console.error('Error toggling feature:', error);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleDelete = async () => {
    if (loadingAction || isPending) return;
    setLoadingAction('delete');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes/${recipeId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setShowDeleteModal(false);
        startTransition(() => {
          router.refresh();
        });
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Feature / Unfeature Button */}
      <button
        onClick={handleToggleFeature}
        disabled={loadingAction !== null || isPending}
        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition disabled:opacity-50 flex items-center gap-1 ${
          isFeatured
            ? 'bg-purple-50 text-purple-600 hover:bg-purple-100'
            : 'bg-amber-50 text-amber-600 hover:bg-amber-100'
        }`}
      >
        {loadingAction === 'feature' ? '...' : isFeatured ? 'Unfeature' : '⭐ Feature'}
      </button>

      {/* Delete Trigger Button */}
      <button
        onClick={() => setShowDeleteModal(true)}
        disabled={loadingAction !== null || isPending}
        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100 transition disabled:opacity-50"
      >
        Delete
      </button>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Recipe?</h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to permanently delete this recipe? This action cannot be undone.
            </p>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={loadingAction === 'delete'}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={loadingAction === 'delete'}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition"
              >
                {loadingAction === 'delete' ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}