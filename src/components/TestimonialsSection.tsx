import React from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-12 bg-slate-900 text-white my-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold mb-3 border border-orange-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Served more than 1 Lakh Orders</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Loved by Gamers across Bangalore
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-lg mx-auto">
            Read real reviews from our gaming community in Indiranagar, Koramangala, HSR Layout, and Whitefield.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 flex flex-col justify-between shadow-lg relative group hover:border-orange-500/50 transition-all"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-slate-700 group-hover:text-orange-500/30 transition-colors" />

              <div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  "{t.comment}"
                </p>
              </div>

              <div>
                <div className="font-bold text-white text-sm">{t.name}</div>
                <div className="text-[11px] text-orange-400 font-medium">{t.city}</div>
                <div className="text-[10px] text-slate-500 mt-1">Rented: {t.product}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
