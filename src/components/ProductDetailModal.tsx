import React, { useState } from 'react';
import { Product } from '../types';
import { X, Star, ShieldCheck, Check, ShoppingBag, Truck, RotateCcw, Clock } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  selectedDuration: number;
  onClose: () => void;
  onAddToCart: (product: Product, duration: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  selectedDuration,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [duration, setDuration] = useState(selectedDuration);

  const getDiscountMultiplier = (m: number) => {
    if (m === 6) return 0.85;
    if (m === 3) return 0.90;
    if (m === 2) return 0.95;
    return 1.0;
  };

  const monthlyPrice = Math.round(product.pricePerMonth * getDiscountMultiplier(duration));
  const totalRentalCost = monthlyPrice * duration;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative flex flex-col md:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-slate-700 shadow-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Image Gallery */}
        <div className="w-full md:w-1/2 bg-slate-100 relative min-h-[300px] md:min-h-full flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {product.badge && (
            <div className="absolute top-4 left-4 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-xl shadow-md">
              {product.badge}
            </div>
          )}
        </div>

        {/* Right Details */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
          <div>
            {/* Category & Rating */}
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
              <span>{product.categoryLabel}</span>
              <div className="flex items-center gap-1 text-slate-700">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold">{product.rating}</span>
                <span>({product.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug mb-3">
              {product.name}
            </h2>

            {/* Description */}
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Specs List */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Key Features & Specifications
              </h4>
              <ul className="space-y-2">
                {product.specs.map((spec, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-700">
                    <div className="w-4 h-4 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tenure Selector in Modal */}
            <div className="mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Select Rental Duration
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 6].map((m) => (
                  <button
                    key={m}
                    onClick={() => setDuration(m)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      duration === m
                        ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {m} {m === 1 ? 'Month' : 'Mos'}
                  </button>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3 mb-6 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <Truck className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Free Delivery & Pickup</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <RotateCcw className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Free Maintenance Guarantee</span>
              </div>
            </div>
          </div>

          {/* Pricing & CTA */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                  ₹{monthlyPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-slate-500 font-medium">/ month</span>
              </div>
              <div className="text-[11px] text-emerald-600 font-semibold">
                Refundable Deposit: ₹{product.deposit.toLocaleString('en-IN')}
              </div>
            </div>

            <button
              onClick={() => {
                onAddToCart(product, duration);
                onClose();
              }}
              className="flex items-center gap-2 px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-2xl shadow-lg shadow-orange-500/30 active:scale-95 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
