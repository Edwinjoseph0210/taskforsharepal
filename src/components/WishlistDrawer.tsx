import React from 'react';
import { Product } from '../types';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-orange-500 fill-orange-500" />
              <h2 className="text-lg font-bold text-slate-900">Your Wishlist</h2>
              <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-0.5 rounded-full">
                {wishlistProducts.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Your wishlist is empty</h3>
                <p className="text-xs text-slate-500 mb-6">
                  Save your favorite gaming consoles and VR kits while browsing.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-orange-500 text-white text-xs font-bold rounded-xl shadow-md shadow-orange-500/20 hover:bg-orange-600 transition-all"
                >
                  Explore Gadgets
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {wishlistProducts.map((product) => (
                  <div key={product.id} className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-xl bg-white shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 text-sm truncate">
                        {product.name}
                      </h4>
                      <div className="text-xs font-extrabold text-slate-900 mt-1 tabular-nums">
                        ₹{product.pricePerMonth.toLocaleString('en-IN')} / month
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={() => {
                            onAddToCart(product);
                            onRemoveWishlist(product);
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 bg-orange-500 text-white text-xs font-bold rounded-lg hover:bg-orange-600 transition-colors"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Rent</span>
                        </button>
                        <button
                          onClick={() => onRemoveWishlist(product)}
                          className="text-red-500 hover:text-red-700 p-1.5 transition-colors"
                          title="Remove"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
