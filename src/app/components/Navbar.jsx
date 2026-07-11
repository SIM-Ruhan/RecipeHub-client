"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import { BiRestaurant } from 'react-icons/bi';
import { HiMenu, HiX } from 'react-icons/hi';
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import { Moon, Sun } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  

  const router = useRouter();
  const dropdownRef = useRef(null);

  // Better Auth session hook
  const { data: session, isPending } = authClient.useSession();
const user = session?.user;
 

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

 const pathname = usePathname();
  if(pathname.includes("dashboard")){
    return null;
  }

  // Logout Handler
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh(); 
        }
      }
    });
  };

  // Helper function to check active path
  const isActive = (path) => pathname === path;

  // Active/Inactive class generator
  const getLinkClasses = (path) => 
    isActive(path)
      ? "text-emerald-600 font-bold transition-colors duration-200"
      : "text-gray-600 hover:text-emerald-600 font-medium transition-colors duration-200";

  return (
    <nav className="shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo & Brand Name */}
          <Link href="/" className="shrink-0 flex items-center gap-2 cursor-pointer">
            <BiRestaurant className="h-8 w-8 text-purple-600" />
            <span className="text-xl font-bold tracking-tight text-yellow-500">
              Recipe<span className="text-emerald-500">Hub</span>
            </span>
          </Link>
          
        

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={getLinkClasses("/")}>
              Home
            </Link>
            <Link href="/browse" className={getLinkClasses("/browse")}>
              Browse Recipes
            </Link>

            {/* Show Dashboard only if logged in */}
            {session && (
              <Link href={`/dashboard/${user?.role}`} className={getLinkClasses("/dashboard")}>
                Dashboard
              </Link>
            )}

              {/* Start here */}
<div className="">
                 <label className="swap swap-rotate">
            <input
              type="checkbox"
              className="theme-controller"
              value="dark"
            />

            {/* Sun icon */}
            <Sun className="swap-off h-6 w-6 cursor-pointer" />

            {/* Moon icon */}
            <Moon className="swap-on h-6 w-6 cursor-pointer" />
          </label>
            </div>
          {/* End here */}

            {!isPending && !session ? (
              // Unauthenticated State
              <>
                <Link href="/login" className={getLinkClasses("/login")}>
                  Login
                </Link>
                <Link href="/registration" className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors duration-200 shadow-sm">
                  Register
                </Link>
              </>
            ) : session ? (
              // Authenticated State (Dropdown)
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <Image unoptimized
                  width={10}
                  height={10}
                    src={session.user.image || "https://ui-avatars.com/api/?name=" + session.user.name}
                    alt={session.user.name}
                    className="h-10 w-10 rounded-full object-cover border-2 border-emerald-500"
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100 z-50 animate-fadeIn">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm text-gray-900 font-bold truncate">{session.user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                    </div>
                    <Link
                      href={`/dashboard/${user?.role}/transaction`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Your Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : null}
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
        <div className="md:hidden border-t border-gray-100 animate-fadeIn">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            <Link
              href="/"
              className={`block px-3 py-2 rounded-md text-base ${isActive('/') ? 'text-emerald-600 font-bold bg-emerald-50' : 'font-medium  hover:text-emerald-600 hover:bg-emerald-50'}`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/browse"
              className={`block px-3 py-2 rounded-md text-base ${isActive('/browse') ? 'text-emerald-600 font-bold bg-emerald-50' : 'font-medium hover:text-emerald-600 hover:bg-emerald-50'}`}
              onClick={() => setIsOpen(false)}
            >
              Browse Recipes
            </Link>

            {session && (
              <Link
                href="/dashboard"
                className={`block px-3 py-2 rounded-md text-base ${isActive('/dashboard') ? 'text-emerald-600 font-bold bg-emerald-50' : 'font-medium hover:text-emerald-600 hover:bg-emerald-50'}`}
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            )}
            {/* Start here */}
<div  className={` flex gap-2 px-3 py-2 rounded-md text-base ${isActive('/dashboard') ? 'text-emerald-600 font-bold bg-emerald-50' : 'font-medium hover:text-emerald-600 hover:bg-emerald-50'}`}>
  <div>
     <h1>Color Mode: </h1>
  </div>
                 <label className="swap swap-rotate">
            <input
              type="checkbox"
              className="theme-controller"
              value="dark"
            />

            {/* Sun icon */}
            <Sun className="swap-off h-6 w-6 cursor-pointer" />

            {/* Moon icon */}
            <Moon className="swap-on h-6 w-6 cursor-pointer" />
          </label>
            </div>
          {/* End here */}

            {!isPending && !session ? (
              <>
                <Link
                  href="/login"
                  className={`block px-3 py-2 rounded-md text-base ${isActive('/login') ? 'text-emerald-600 font-bold bg-emerald-50' : 'font-medium hover:text-emerald-600 hover:bg-emerald-50'}`}
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <div className="pt-2 px-3">
                  <Link
                    href="/registration"
                    className="block text-center bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors shadow-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              </>
            ) : session ? (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-4 mb-3">
                  <div className="shrink-0">
                    <Image unoptimized
                    width={10}
                    height={10}
                      className="h-10 w-10 rounded-full border-2 border-emerald-500"
                      src={session.user.image || "https://ui-avatars.com/api/?name=" + session.user.name}
                      alt={session.user.name}
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium">{session.user.name}</div>
                    <div className="text-sm font-medium text-gray-500">{session.user.email}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  <Link
                    href={`/dashboard/${user?.role}/transaction`}
                    className="block px-3 py-2 rounded-md text-base font-medium hover:text-emerald-600 hover:bg-emerald-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;