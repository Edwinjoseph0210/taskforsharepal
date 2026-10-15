import React, { useState } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  selectedCategory: string;
  searchQuery: string;
  selectedDuration: number;
  wishlistIds: string[];
  isPricesUnlocked: boolean;
  onUnlockPrices: () => void;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  searchQuery,
  selectedDuration,
  wishlistIds,
  isPricesUnlocked,
  onUnlockPrices,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
}) => {
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high' | 'rating'>('popular');

  // Filter products
  const filtered = products.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-low') return a.pricePerMonth - b.pricePerMonth;
    if (sortBy === 'price-high') return b.pricePerMonth - a.pricePerMonth;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.bookingsCount - a.bookingsCount; // popular
  });

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as any);
    // Smooth scroll to top of products grid when sorting changes
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="py-6" id="products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Results Header & Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Available Gaming Gadgets in Bangalore ({sorted.length} Items)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Showing filtered rental inventory. {!isPricesUnlocked && <span className="text-orange-600 font-bold ml-1">🔒 Prices are currently blurred. Select dates or click unlock to view prices.</span>}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-xs">
              <ArrowUpDown className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-semibold text-slate-600 hidden sm:inline">Sort by:</span>
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="bg-transparent text-xs sm:text-sm font-bold text-slate-900 outline-none cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {sorted.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sorted.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                selectedDuration={selectedDuration}
                isWishlisted={wishlistIds.includes(product.id)}
                isPricesUnlocked={isPricesUnlocked}
                onUnlockPrices={onUnlockPrices}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={onAddToCart}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center my-8 shadow-xs">
            <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <SlidersHorizontal className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">No gaming gadgets found</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
              We couldn't find any gaming items matching your search or filter criteria. Try searching for "PS5", "Xbox", or "VR".
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
