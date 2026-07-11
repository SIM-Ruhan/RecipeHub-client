'use client';

import React, { useState } from 'react';
import { BiHeart, BiBookmark, BiFlag, BiCreditCard, BiSolidHeart, BiSolidBookmark } from 'react-icons/bi';
import { useRouter } from 'next/navigation';

export default function RecipeActionPanel({
    recipeId, initialLikes, initialIsLiked = false, initialIsSaved = false, price, userId
}) {
    const router = useRouter();

    const [likes, setLikes] = useState(initialLikes);
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const [isSaved, setIsSaved] = useState(initialIsSaved);

    const [showModal, setShowModal] = useState(false);
    const [reportType, setReportType] = useState('Spam');
    const [otherReason, setOtherReason] = useState('');
    const [isSubmittingReport, setIsSubmittingReport] = useState(false);

    const requireAuth = () => {
        if (!userId) {
            alert("Please log in to continue.");
            return false;
        }
        return true;
    };

    const handleLike = async () => {
        if (!requireAuth()) return;
        const newLikeState = !isLiked;
        setIsLiked(newLikeState);
        setLikes(prev => newLikeState ? prev + 1 : prev - 1);

        try {
            await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes/${recipeId}/like`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, isLiked: newLikeState })
            });
            router.refresh();
        } catch (error) {
            console.error("Failed to like", error);
            setIsLiked(!newLikeState);
            setLikes(prev => newLikeState ? prev - 1 : prev + 1);
        }
    };

   const handleFavorite = async () => {
  if (!requireAuth()) return;
  const newSaved = !isSaved;
  setIsSaved(newSaved);
  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes/${recipeId}/favorite`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          isSaved: newSaved,
        }),
      }
    );
  } catch (error) {
    console.error("Failed to update favorite", error);
    setIsSaved(!newSaved);
  }
};
//start
const handlePurchase = async () => {

    if (!requireAuth()) return;

    try {

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/purchases`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    recipeId,
                    userId,
                    price,
                }),
            }
        );

    } catch (err) {

        console.log(err);

    }

};

//end here
    const handleReportSubmit = async (e) => {
        e.preventDefault();
        if (!requireAuth()) return;
        setIsSubmittingReport(true);

        const finalReason = otherReason.trim() ? otherReason.trim() : reportType;

        try {
            await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reports`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ recipeId, reportedBy: userId, reason: finalReason })
            });
            setShowModal(false);
            setOtherReason('');
            alert("Recipe reported successfully.");
        } catch (error) {
            console.error("Failed to report", error);
        } finally {
            setIsSubmittingReport(false);
        }
    };

    return (
        <>
            <div className="w-full flex flex-col gap-3 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm shadow-slate-100">
                <form action="/api/checkout_sessions" method="POST">
                    <input type="hidden" name="plan_id" value="seller_starter" />
                    <input type="hidden" name="recipe_id" value={recipeId} />
                    <input type="hidden" name="user_id" value={userId || ''} />
                    <button 
                        type="submit" onClick={handlePurchase}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold py-3.5 px-6 rounded-xl shadow-md shadow-emerald-600/10 flex items-center justify-center gap-2.5 transition-all duration-200 tracking-wide text-sm"
                    >
                        <BiCreditCard className="text-xl" /> Buy Recipe Now — ${price}
                    </button>
                </form>
               
                <div className="flex flex-col gap-2">
                    <button
                        onClick={handleLike}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 border ${
                            isLiked 
                                ? 'bg-rose-50 border-rose-100 text-rose-600 shadow-sm' 
                                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-transparent'
                        }`}
                    >
                        <div className="flex items-center gap-2.5">
                            {isLiked ? <BiSolidHeart className="text-xl text-rose-500 animate-pulse" /> : <BiHeart className="text-xl text-slate-400" />}
                            <span>{isLiked ? 'Liked Recipe' : 'Like Recipe'}</span>
                        </div>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isLiked ? 'bg-rose-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                            {likes}
                        </span>
                    </button>

                    <button
                        onClick={handleFavorite}
                        className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 border ${
                            isSaved 
                                ? 'bg-indigo-50 border-indigo-100 text-indigo-600 shadow-sm' 
                                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-transparent'
                        }`}
                    >
                        {isSaved ? <BiSolidBookmark className="text-xl text-indigo-500" /> : <BiBookmark className="text-xl text-slate-400" />}
                        <span>{isSaved ? 'Saved to Favorites' : 'Save to Favorites'}</span>
                    </button>

                    <button
                        onClick={() => setShowModal(true)}
                        className="w-full flex items-center gap-2.5 bg-slate-50 hover:bg-red-50 hover:text-red-600 text-slate-500 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 border border-transparent"
                    >
                        <BiFlag className="text-xl text-slate-400 group-hover:text-red-500" />
                        <span>Report Recipe</span>
                    </button>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
                        <h3 className="text-xl font-bold text-slate-900 mb-1 tracking-tight">Report Recipe</h3>
                        <p className="text-sm text-slate-500 mb-5">Please select the reason for reporting this recipe.</p>

                        <form onSubmit={handleReportSubmit}>
                            <div className="space-y-3 mb-5">
                                {['Spam', 'Offensive content', 'Copyright issue'].map((option) => (
                                    <label key={option} className="flex items-center gap-3 cursor-pointer p-3 rounded-xl hover:bg-slate-50 border border-slate-100 transition-colors">
                                        <input
                                            type="radio"
                                            name="reportType"
                                            value={option}
                                            checked={reportType === option && !otherReason}
                                            onChange={() => { setReportType(option); setOtherReason(''); }}
                                            className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-slate-300"
                                        />
                                        <span className="text-slate-700 text-sm font-medium">{option}</span>
                                    </label>
                                ))}
                            </div>

                            <div className="mb-6">
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Other Reasons</label>
                                <input
                                    type="text"
                                    name="Others"
                                    placeholder="Specify a different reason..."
                                    value={otherReason}
                                    onChange={(e) => setOtherReason(e.target.value)}
                                    className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmittingReport}
                                    className="px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors disabled:opacity-50 shadow-sm shadow-red-600/10"
                                >
                                    {isSubmittingReport ? 'Reporting...' : 'Submit Report'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}