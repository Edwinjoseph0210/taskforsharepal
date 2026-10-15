import React from 'react';
import { Product } from '../types';
import { Star, Heart, ShoppingBag, ShieldCheck, Eye, Lock } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  selectedDuration: number;
  isWishlisted: boolean;
  isPricesUnlocked: boolean;
  onUnlockPrices: () => void;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  selectedDuration,
  isWishlisted,
  isPricesUnlocked,
  onUnlockPrices,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
}) => {
  const getDiscountMultiplier = (months: number) => {
    if (months === 6) return 0.85;
    if (months === 3) return 0.90;
    if (months === 2) return 0.95;
    return 1.0;
  };

  const adjustedPrice = Math.round(product.pricePerMonth * getDiscountMultiplier(selectedDuration));

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 hover:border-orange-500/60 shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden relative">
      
      {/* Image Container */}
      <div 
        className="relative bg-slate-100 aspect-[4/3] overflow-hidden cursor-pointer"
        onClick={() => onSelectProduct(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Hover Quick View Overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            className="px-4 py-2 bg-white text-slate-900 text-xs font-bold rounded-xl shadow-lg flex items-center gap-1.5 hover:bg-orange-500 hover:text-white transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-sm z-10">
            {product.badge}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all shadow-sm z-10 ${
            isWishlisted
              ? 'bg-orange-500 text-white'
              : 'bg-white/80 hover:bg-white text-slate-700'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Lowest Price Guarantee Indicator */}
        <div className="absolute bottom-2.5 left-2.5 bg-emerald-500/95 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 backdrop-blur-xs z-10">
          <ShieldCheck className="w-3 h-3" />
          <span>Lowest Price Guarantee</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 justify-between bg-white">
        
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5 font-medium">
            <span>{product.categoryLabel}</span>
            <div className="flex items-center gap-1 text-slate-700">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold">{product.rating}</span>
              <span className="text-slate-400">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelectProduct(product)}
            className="font-bold text-slate-900 text-base line-clamp-2 hover:text-orange-600 transition-colors cursor-pointer leading-snug mb-2"
          >
            {product.name}
          </h3>

          {/* Key Feature bullet */}
          <p className="text-xs text-slate-500 line-clamp-1 mb-4 font-medium">
            {product.specs[0]}
          </p>
        </div>

        {/* Pricing & Action */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <div className="relative">
            {isPricesUnlocked ? (
              <>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-extrabold text-slate-900 tabular-nums">
                    ₹{adjustedPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">/ month</span>
                </div>
                <div className="text-[11px] text-emerald-600 font-semibold">
                  Deposit: ₹{product.deposit.toLocaleString('en-IN')}
                </div>
              </>
            ) : (
              <button
                onClick={onUnlockPrices}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-xl text-xs font-bold border border-orange-200 transition-colors"
                title="Click to unlock prices"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Select dates to view price</span>
              </button>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md shadow-orange-500/20 active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Rent Now</span>
          </button>
        </div>

      </div>

    </div>
  );
};
