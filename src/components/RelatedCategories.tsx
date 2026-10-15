import React from 'react';
import { RELATED_CATEGORIES } from '../data/mockData';
import { ChevronRight } from 'lucide-react';

export const RelatedCategories: React.FC = () => {
  return (
    <section className="py-10 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">
          Explore Other Rental Categories in Bangalore
        </h3>

        <div className="flex flex-wrap gap-2.5">
          {RELATED_CATEGORIES.map((cat, idx) => (
            <a
              key={idx}
              href="#"
              onClick={(e) => e.preventDefault()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-orange-50 hover:text-orange-600 text-xs font-semibold text-slate-700 transition-colors border border-slate-200/60"
            >
              <span>{cat} on Rent</span>
              <ChevronRight className="w-3 h-3 text-slate-400" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
