import Link from 'next/link';
import React from 'react';
import { HiOutlineArrowLongRight } from 'react-icons/hi2';



const HeroBanner = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Title, Description, CTA */}
          <div className="space-y-6 lg:col-span-7 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            
            {/* Aesthetic Tagline */}
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 tracking-wide uppercase">
              ✨ Cook with Confidence
            </span>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Your Daily Dose of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                Culinary Inspiration
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Unlock hundreds of delicious, easy-to-follow recipes curated by expert chefs and passionate home cooks. From quick weeknight dinners to gourmet showstoppers, your next favorite meal is just a click away.
            </p>

            {/* CTA Button */}
            <div className="pt-4 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link
  href="/browse"
  className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-600 px-7 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-emerald-500/30"
>
  {/* Shine Effect */}
  <span className="absolute inset-0 -translate-x-full skew-x-12 bg-white/20 transition-transform duration-700 group-hover:translate-x-[250%]" />

  {/* Text */}
  <span className="relative flex items-center gap-3">
    <span>Explore Recipes</span>

    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-all duration-300 group-hover:bg-white group-hover:text-emerald-600">
      <HiOutlineArrowLongRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
    </span>
  </span>
</Link>
              
              <Link
  href="/pricing"
  className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 px-7 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/30"
>
  <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>

  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.719c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.95-.69l1.07-3.292z" />
  </svg>

  <span className="relative z-10">Become a Premium Member</span>
</Link>
            </div>
          </div>

          {/* Right Column: Aesthetic Visual Showcase */}
          <div className="lg:col-span-5 relative w-full h-[350px] sm:h-[450px] lg:h-[500px]">
            {/* Background decorative blob */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-200 to-teal-100 rounded-3xl transform rotate-3 scale-95 opacity-70 blur-xs"></div>
            
            {/* Main Visual Frame */}
            <div className="absolute inset-0 bg-gray-100 rounded-3xl overflow-hidden shadow-xl border-4 border-white transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800"
                alt="Delicious healthy grain bowl"
                className="w-full h-full object-cover"
              />
              
              {/* Floating Review Overlay */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/20 flex items-center gap-3 animate-bounce-slow">
                <div className="bg-emerald-500 text-white p-2 rounded-lg font-bold text-sm">
                  4.9★
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">Over 10k+ Tested Recipes</p>
                  <p className="text-[10px] text-gray-500">Loved by home chefs worldwide</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroBanner;