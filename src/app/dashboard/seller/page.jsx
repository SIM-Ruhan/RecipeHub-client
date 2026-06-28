"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";

// Icons
import { 
  BiMoney, 
  BiHeart, 
  BiBookOpen, 
  BiTrendingUp,
  BiStar
} from "react-icons/bi";
import { HiOutlineArrowRight } from "react-icons/hi";

export default function SellerDashboardHomepage() {
  // Fetch user session for dynamic greeting and premium status
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  if(isPending){
    return <div>loading......</div>
}
  // In a real app, this would come from your MongoDB /payments and /recipes collections
//   const isPremium = user?.isPremium || true; 

  // Mock Data for UI visualization
  const stats = [
    { title: "Total Revenue", value: "$1,240.50", icon: BiMoney, color: "text-emerald-600", bg: "bg-emerald-100" },
    { title: "Active Recipes", value: "24", icon: BiBookOpen, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Total Favorites", value: "842", icon: BiHeart, color: "text-rose-600", bg: "bg-rose-100" },
    { title: "Profile Views", value: "3.2k", icon: BiTrendingUp, color: "text-purple-600", bg: "bg-purple-100" },
  ];

  const recentTransactions = [
    { id: "TRX-9821", recipe: "Spicy Thai Basil Chicken", buyer: "john@example.com", amount: "$4.99", date: "Today, 10:23 AM", status: "Completed" },
    { id: "TRX-9820", recipe: "Classic Beef Wellington", buyer: "sarah.m@gmail.com", amount: "$9.99", date: "Yesterday, 2:15 PM", status: "Completed" },
    { id: "TRX-9819", recipe: "Creamy Tuscan Pasta", buyer: "mike_chef@yahoo.com", amount: "$3.49", date: "Oct 24, 6:00 PM", status: "Completed" },
    { id: "TRX-9818", recipe: "Vegan Chocolate Tart", buyer: "emma.w@outlook.com", amount: "$5.99", date: "Oct 23, 1:10 PM", status: "Pending" },
  ];

  // Framer Motion Variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  if (isPending) {
    return <div className="p-8 flex justify-center items-center h-full"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div></div>;
  }

  return (
    <div className="space-y-6">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name || "Chef"}! 👋
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Here is what is happening with your recipes today.
          </p>
        </div>
        
        {/* Premium Badge & Quick Action */}
        <div className="flex items-center gap-3">
          {/* {isPremium && (
            <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-100 to-yellow-100 border border-yellow-200 text-yellow-800 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm">
              <BiStar className="text-yellow-600 h-4 w-4" />
              Premium Creator
            </div>
          )} */}
          <Link 
            href="/dashboard/seller/add-recipe"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm"
          >
            + New Recipe
          </Link>
        </div>
      </div>

      {/* 2. Key Metrics Grid (Animated) */}
      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        animate="show" 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => (
          <motion.variants key={index} variants={itemVariants}>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className={`p-4 rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
              </div>
            </div>
          </motion.variants>
        ))}
      </motion.div>

      {/* 3. Recent Transactions Table */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
      >
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-900">Recent Sales</h2>
          <Link href="/dashboard/seller/transaction" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
            View All <HiOutlineArrowRight />
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white text-xs uppercase tracking-wider text-gray-500 border-b border-gray-100">
                <th className="px-6 py-4 font-semibold">Transaction ID</th>
                <th className="px-6 py-4 font-semibold">Recipe</th>
                <th className="px-6 py-4 font-semibold">Buyer</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold text-right">Amount</th>
                <th className="px-6 py-4 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentTransactions.map((trx, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{trx.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{trx.recipe}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{trx.buyer}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{trx.date}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900 text-right">{trx.amount}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      trx.status === "Completed" 
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}>
                      {trx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Empty State Fallback (Optional, for when DB returns 0 transactions) */}
          {recentTransactions.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No transactions found yet. Keep sharing recipes!
            </div>
          )}
        </div>
      </motion.div>

    </div>
  );
}

