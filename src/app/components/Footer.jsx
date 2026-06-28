"use client"
import { usePathname } from 'next/navigation';
import React from 'react';
import { BiRestaurant } from 'react-icons/bi';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { HiOutlinePhone } from 'react-icons/hi'; 
import { HiOutlineMapPin } from "react-icons/hi2";

const Footer = () => {
  const currentYear = new Date().getFullYear();
   const pathname = usePathname();
  if(pathname.includes("dashboard")){
    return null;
  }

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Logo & Brand Pitch */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 cursor-pointer">
              <BiRestaurant className="h-8 w-8 text-purple-500" />
              <span className="text-xl font-bold tracking-tight text-yellow-500">
                Recipe<span className="text-emerald-500">Hub</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Discover, cook, and share your favorite recipes from around the world. Your ultimate culinary companion.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#home" className="hover:text-emerald-400 transition-colors duration-200">Home</a>
              </li>
              <li>
                <a href="#browse" className="hover:text-emerald-400 transition-colors duration-200">Browse Recipes</a>
              </li>
              <li>
                <a href="#login" className="hover:text-emerald-400 transition-colors duration-200">Login</a>
              </li>
              <li>
                <a href="#register" className="hover:text-emerald-400 transition-colors duration-200">Register Now</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Information */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <HiOutlineMail className="h-5 w-5 text-emerald-500 shrink-0" />
                <span className="hover:text-emerald-400 cursor-pointer">support@recipehub.com</span>
              </li>
              <li className="flex items-center gap-3">
                <HiOutlinePhone className="h-5 w-5 text-emerald-500 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <HiOutlineMapPin className="h-5 w-5 text-emerald-500 shrink-0" />
                <span className="text-gray-400">123 Culinary Ave, Foodie City</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Links & Newsletter hint */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Follow the Flavor</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-emerald-600 hover:text-white transition-all duration-200" aria-label="Facebook">
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-emerald-600 hover:text-white transition-all duration-200" aria-label="Twitter">
                <FaTwitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-emerald-600 hover:text-white transition-all duration-200" aria-label="Instagram">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-emerald-600 hover:text-white transition-all duration-200" aria-label="Pinterest">
                <FaPinterestP className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-gray-500">Join our community to get weekly meal plans!</p>
          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; {currentYear} RecipeHub. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;