
// import { getRecipeId } from '@/lib/api';
// import React from 'react';
// const RecipeDetailsPage = async ({ params }) => {
//     const {id} = await params;
//     const recipe = await getRecipeId(id)

//     return (
//         <div className="p-10">
            
       
//         </div>
//     );
// };

// export default RecipeDetailsPage;


import { getRecipeId, getRecipeStatus } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import { BiTime, BiChevronLeft } from 'react-icons/bi';
import { TbChefHat, TbFlame } from 'react-icons/tb';
import { notFound } from 'next/navigation';
import { Fraunces, Inter, IBM_Plex_Mono } from 'next/font/google';
import RecipeActionPanel from './RecipeActionPanel';
import { getUserSession } from '@/lib/core/session';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['600', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-display',
});
const inter = Inter({ subsets: ['latin'], variable: '--font-body' });
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-mono',
});

const RecipeDetailsPage = async ({ params }) => {
  const { id } = await params;
  const recipe = await getRecipeId(id);

  if (!recipe) {
    notFound();
  }

  const user = await getUserSession();
  const userId = user?.id || null;
  const status = userId ? await getRecipeStatus(id, userId) : { isLiked: false, isSaved: false };

  const {
    _id,
    recipeName,
    recipeImage,
    category,
    difficultyLevel,
    preparationTime,
    instructions = [],
    authorName,
    likesCount,
    price = "00",
  } = recipe;

  return (
    <div
      className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} min-h-screen bg-slate-50 py-10 px-4 antialiased`}
      style={{ fontFamily: 'var(--font-body)' }}
    >
      <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden">
        
        {/* Back Navigation Bar */}
        <div className="px-6 md:px-10 pt-6 flex items-center justify-between">
          <Link
            href="/browse"
            className="inline-flex items-center gap-1 text-xs font-bold tracking-wider text-slate-500 hover:text-slate-800 uppercase transition-colors group"
          >
            <BiChevronLeft className="text-xl transition-transform group-hover:-translate-x-0.5" /> Back to Browse
          </Link>
          <span className="text-xs font-mono font-medium text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
            ID: {(_id || id).substring(0, 8).toUpperCase()}
          </span>
        </div>

        {/* Premium Hero Media Frame */}
        <div className="relative mt-5 mx-4 md:mx-10 rounded-2xl overflow-hidden h-80 md:h-[28rem] shadow-inner bg-slate-100">
          <Image
            unoptimized
            src={recipeImage || "/placeholder-recipe.jpg"}
            alt={recipeName}
            fill
            className="object-cover transition-transform duration-700 hover:scale-102"
            priority
          />
          {/* Subtle Scrim for Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col items-start">
            <span className="inline-block px-3 py-1 rounded-md text-xs font-bold tracking-wider text-emerald-800 bg-emerald-100/90 backdrop-blur-sm uppercase mb-4">
              {category}
            </span>
            <h1
              className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {recipeName}
            </h1>
          </div>
        </div>

        {/* Content Layout Body */}
        <div className="px-4 md:px-10 py-8">
          
          {/* Dynamic Row Meta Segment */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 mb-8 border-b border-slate-100">
            <div className="flex flex-wrap gap-2.5">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-medium bg-slate-50 text-slate-600 border border-slate-100">
                <TbChefHat className="text-lg text-slate-400" />
                <span>By <span className="font-semibold text-slate-800">{authorName}</span></span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-medium bg-slate-50 text-slate-600 border border-slate-100">
                <BiTime className="text-lg text-slate-400" />
                <span>{preparationTime} mins</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-medium bg-slate-50 text-slate-600 border border-slate-100">
                <TbFlame className="text-lg text-orange-500" />
                <span className="capitalize">{difficultyLevel}</span>
              </div>
            </div>
          </div>

          {/* Core Functional Workspace Segment */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Content Column (Ingredients & Panel Container) */}
            <div className="lg:col-span-5 space-y-8">
              {/* Dynamic Action Utility Center */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Recipe Actions
                </h3>
                <RecipeActionPanel
                  recipeId={_id || id}
                  initialLikes={likesCount || 0}
                  initialIsLiked={status?.isLiked || false}
                  initialIsSaved={status?.isSaved || false}
                  price={price}
                  userId={userId}
                />
              </div>

            </div>

            {/* Right Content Column (Instructions Timeline) */}
            <div className="lg:col-span-7">
              <h3
                className="text-2xl font-bold text-slate-900 tracking-tight mb-6"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Preparation Method
              </h3>

              {instructions.length > 0 ? (
                <ol className="relative pl-2">
                  {instructions.map((step, i) => (
                    <li key={i} className="relative pl-12 pb-8 last:pb-0 group">
                      {/* Modernized Timeline Trace Guide */}
                      {i !== instructions.length - 1 && (
                        <span
                          className="absolute left-[18px] top-9 bottom-0 w-0.5 bg-slate-100 group-hover:bg-slate-200 transition-colors"
                        />
                      )}
                      <span
                        className="absolute left-0 top-0 w-9 h-9 flex items-center justify-center rounded-xl text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200/60 shadow-sm"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="bg-slate-50/50 hover:bg-slate-50 border border-transparent hover:border-slate-100 p-4 rounded-xl transition-all duration-200">
                        <p className="text-[15px] leading-relaxed text-slate-600 font-medium">
                          {step}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-sm italic text-slate-400 bg-slate-50 border border-slate-100 rounded-xl p-4 text-center">
                  No steps added for this recipe yet.
                </p>
              )}
            </div>
            
          </div>

        </div>
      </div>
    </div>
  );
};

export default RecipeDetailsPage;