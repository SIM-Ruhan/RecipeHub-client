import Link from 'next/link';
import React from 'react';
import { HiOutlineArrowLongRight } from 'react-icons/hi2';

const HeroBanner = () => {
  return (
    <section className="relative bg-gradient-to-b from-emerald-50/50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Title, Description, CTA */}
          <div className="space-y-6 lg:col-span-7 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            
            {/* Aesthetic Tagline */}
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 tracking-wide uppercase">
              ✨ Cook with Confidence
            </span>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
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
                className="group inline-flex items-center justify-center px-6 py-3.5 border border-transparent text-base font-semibold rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all duration-200 gap-2"
              >
                Explore Recipes
                <HiOutlineArrowLongRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/registration"
                className="inline-flex items-center justify-center px-6 py-3.5 border border-gray-300 text-base font-semibold rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 shadow-sm"
              >
                Join Community
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