import React from 'react';
import { MapPin, Search, ShoppingBag, Heart, User, Gamepad2, ChevronDown } from 'lucide-react';

interface HeaderProps {
  selectedCity: string;
  onOpenCityModal: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAuth: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedCity,
  onOpenCityModal,
  searchQuery,
  onSearchChange,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenAuth,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-20">
          
          {/* Zone 1: Brand Wordmark & City Selector */}
          <div className="flex items-center gap-6 shrink-0">
            <a href="#" className="flex items-center gap-2 text-slate-900 group">
              <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-slate-900">
                  Share<span className="text-orange-500">Pal</span>
                </span>
                <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase -mt-1">
                  Gaming on Rent
                </span>
              </div>
            </a>

            <button
              onClick={onOpenCityModal}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors border border-slate-200/60"
            >
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              <span>{selectedCity}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
          </div>

          {/* Center Search Input */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search PS5, Xbox, VR, Gaming..."
                className="w-full pl-10 pr-4 py-2 bg-slate-100 hover:bg-slate-100/80 focus:bg-white text-sm text-slate-900 rounded-xl border border-transparent focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all placeholder:text-slate-400 font-medium"
              />
            </div>
          </div>

          {/* Zone 3: Navigation Links & Action Buttons */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <nav className="hidden xl:flex items-center gap-6 text-sm font-semibold text-slate-600">
              <a href="#products" className="hover:text-orange-600 transition-colors whitespace-nowrap">Catalog</a>
              <a href="#how-it-works" className="hover:text-orange-600 transition-colors whitespace-nowrap">How It Works</a>
              <a href="#faqs" className="hover:text-orange-600 transition-colors whitespace-nowrap">FAQs</a>
            </nav>

            <div className="flex items-center gap-2 border-l border-slate-200 pl-3 sm:pl-4">
              {/* Wishlist Button */}
              <button
                onClick={onOpenWishlist}
                className="relative p-2.5 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Button */}
              <button
                onClick={onOpenCart}
                className="relative p-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-600 transition-colors flex items-center gap-2 px-3.5 border border-orange-200/50"
                title="Cart"
              >
                <ShoppingBag className="w-5 h-5 text-orange-600" />
                <span className="hidden sm:inline text-xs font-bold">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-orange-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md shadow-orange-600/30">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Account Button */}
              <button
                onClick={onOpenAuth}
                className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors"
                title="Account"
              >
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

        {/* Mobile Search Bar Row */}
        <div className="lg:hidden pb-3 pt-1">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search PS5, Xbox, VR, Gaming..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100 focus:bg-white text-sm text-slate-900 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all placeholder:text-slate-400 font-medium"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
