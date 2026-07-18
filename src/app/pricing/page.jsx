"use client";

import React from "react";
import { motion } from "framer-motion";
import { BiCheck } from "react-icons/bi";

const pricingTiers = [
  {
    name: "Starter",
    id: "seller_starter",
    price: "1",
    description: "Perfect for hobbyist home cooks.",
    features: ["Up to 10 recipe listings", "Basic search visibility", "Community support", "Standard profile"],
    buttonText: "Your Current Plan",
    featured: false,
  },
  {
    name: "Kitchen Pro",
    id: "seller_pro",
    price: "9",
    description: "Grow your culinary brand.",
    features: ["Up to 50 recipe listings", "Advanced recipe analytics", "Featured in category search", "Priority support", "Custom branding"],
    buttonText: "Upgrade to Pro",
    featured: true,
  },
  {
    name: "Master Chef",
    id: "seller_master",
    price: "19",
    description: "For professional recipe developers.",
    features: ["Unlimited recipe listings", "Real-time sales insights", "Exclusive 'Verified Chef' badge", "Direct-to-fan messaging", "Global marketplace ads"],
    buttonText: "Upgrade to Master",
    featured: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          Choose the plan that <span className="text-emerald-600">fits your kitchen</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Scale your recipe empire with tools designed for every level of creator.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 items-center px-4">
        {pricingTiers.map((tier, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -10 }}
            className={`p-8 rounded-3xl shadow-sm border ${
              tier.featured ? "border-emerald-500 ring-2 ring-emerald-100" : "border-gray-200"
            }`}
          >
            {tier.featured && (
              <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Popular
              </span>
            )}
            <h3 className="text-xl font-bold mt-4">{tier.name}</h3>
            <div className="my-6">
              <span className="text-5xl font-extrabold">${tier.price}</span>
              <span className="text-gray-400 ml-2">/ month</span>
            </div>
            <p className="text-gray-600 mb-8">{tier.description}</p>
            
            <ul className="space-y-4 mb-8 text-left">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-500">
                  <BiCheck className="text-emerald-500 text-xl" /> {feature}
                </li>
              ))}
            </ul>
  <form action="/api/checkout_sessions" method="POST">
  <input type="hidden" name="plan_id" value={tier.id}/>
      <section>
        <button type="submit" role="link"  className={`w-full py-4 rounded-xl font-bold transition-all ${
                tier.featured
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "bg-gray-100 text-gray-900 hover:bg-emerald-400"
              }`}>
          Checkout
        </button>
      </section>
    </form>
          </motion.div>
        ))}
      </div>
    </div>
  );
}