'use client';

import { useState } from 'react';
import { BiCheck } from 'react-icons/bi';

const IngredientChecklist = ({ ingredients = [] }) => {
  const [checked, setChecked] = useState(() => new Set());

  const toggle = (i) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  if (ingredients.length === 0) {
    return (
      <p className="text-sm italic text-slate-400 bg-slate-50 border border-slate-100 rounded-xl p-4 text-center">
        No ingredients listed for this recipe yet.
      </p>
    );
  }

  return (
    <ul className="space-y-2.5">
      {ingredients.map((ing, i) => {
        const isChecked = checked.has(i);
        return (
          <li key={i}>
            <button
              type="button"
              onClick={() => toggle(i)}
              className={`w-full flex items-center gap-3.5 text-left px-4 py-3.5 rounded-xl border transition-all duration-200 outline-none focus:ring-2 focus:ring-slate-200 group ${
                isChecked
                  ? 'bg-slate-50/80 border-slate-200/60 opacity-75'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm shadow-slate-100/50 hover:shadow'
              }`}
            >
              <span
                className={`shrink-0 w-5 h-5 rounded-md flex items-center justify-center border transition-all duration-200 ${
                  isChecked
                    ? 'bg-emerald-600 border-emerald-600 scale-100'
                    : 'bg-white border-slate-300 group-hover:border-slate-400'
                }`}
              >
                <BiCheck
                  className={`text-white text-base transition-transform duration-200 ${
                    isChecked ? 'scale-100' : 'scale-0'
                  }`}
                />
              </span>
              <span
                className={`text-[15px] font-medium tracking-wide transition-all duration-200 ${
                  isChecked
                    ? 'text-slate-400 line-through decoration-slate-300'
                    : 'text-slate-700'
                }`}
              >
                {ing}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default IngredientChecklist;