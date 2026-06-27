"use client"
import React, { useState } from 'react';
import { BiRestaurant } from 'react-icons/bi'; // Logo Icon
import { HiMenu,HiX } from 'react-icons/hi'; // Mobile Menu Icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo & Brand Name */}
          <div className="shrink-0 flex items-center gap-2 cursor-pointer">
            <BiRestaurant className="h-8 w-8 text-purple-600" />
            <span className="text-xl font-bold tracking-tight text-yellow-500">
              Recipe<span className="text-emerald-500">Hub</span>
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-600 hover:text-emerald-600 font-medium transition-colors duration-200">
              Home
            </a>
            <a href="#browse" className="text-gray-600 hover:text-emerald-600 font-medium transition-colors duration-200">
              Browse Recipes
            </a>
            <a href="#login" className="text-gray-600 hover:text-emerald-600 font-medium transition-colors duration-200">
              Login
            </a>
            <a href="#register" className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors duration-200 shadow-sm">
              Register
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-600 hover:text-emerald-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drops Down */}
      {isOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-100 animate-fadeIn">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            <a
              href="#home"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </a>
            <a
              href="#browse"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Browse Recipes
            </a>
            <a
              href="#login"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Login
            </a>
            <div className="pt-2 px-3">
              <a
                href="#register"
                className="block text-center bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors shadow-sm"
                onClick={() => setIsOpen(false)}
              >
                Register
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;