
import { Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const DashNavbar = () => {
    return (
        <div className="font-bold flex items-center space-x-8">
            <div >
<Link href="/" className='hover:text-emerald-700'>
              Home
            </Link>
            </div>
            <div className="hover:text-emerald-700">
<Link href="/browse">
              Browse Recipes
            </Link>
            </div>
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
        
        </div>
    );
};

export default DashNavbar;