import React, { useState } from 'react';
import { PRODUCTS } from './data/mockData';
import { Product, CartItem } from './types';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { RentalDateSelector } from './components/RentalDateSelector';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CityModal } from './components/CityModal';
import { AuthModal } from './components/AuthModal';
import { TrustMetrics } from './components/TrustMetrics';
import { FAQSection } from './components/FAQSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { RelatedCategories } from './components/RelatedCategories';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { AIChatWidget } from './components/AIChatWidget';
import { Gamepad2, ShieldCheck, Truck, Sparkles, ChevronRight } from 'lucide-react';

export default function App() {
  const [selectedCity, setSelectedCity] = useState<string>('Bangalore');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<number>(1);
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [isPricesUnlocked, setIsPricesUnlocked] = useState<boolean>(false);

  const [wishlistIds, setWishlistIds] = useState<string[]>(['prod-1']);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string>('');
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setIsToastOpen(true);
  };

  // Modals & Drawers state
  const [isCityModalOpen, setIsCityModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Wishlist Toggle
  const handleToggleWishlist = (product: Product) => {
    const isAlreadyWishlisted = wishlistIds.includes(product.id);
    setWishlistIds((prev) =>
      isAlreadyWishlisted ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
    showToast(isAlreadyWishlisted ? `Removed ${product.name} from wishlist` : `Added ${product.name} to wishlist`);
  };

  // Add to Cart
  const handleAddToCart = (product: Product, durationOverride?: number) => {
    const duration = durationOverride || selectedDuration;
    setCartItems((prev) => [
      ...prev,
      {
        product,
        durationMonths: duration,
        startDate,
        quantity: 1,
      },
    ]);
    showToast(`Added ${product.name} to your rental cart!`);
    setIsCartOpen(true);
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
    showToast('Removed item from cart');
  };

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Header */}
      <Header
        selectedCity={selectedCity}
        onOpenCityModal={() => setIsCityModalOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={cartItems.length}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* Breadcrumb & Category Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <a href="#" className="hover:text-slate-900 transition-colors">Home</a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-700">{selectedCity}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-orange-600 font-bold">Gaming Gadgets on Rent</span>
          </div>
        </div>
      </div>

      <CategoryNav
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Gaming Category Introduction Hero */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12 lg:py-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold mb-4 border border-orange-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen Gaming Delivered in {selectedCity}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
                Gaming Gadgets on Rent in {selectedCity}
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                Experience the ultimate gaming thrill without paying lakhs upfront. Rent PlayStation 5 (PS5), Xbox Series X, Meta Quest VR Headsets, and racing simulators on rent with free doorstep delivery and pickup across {selectedCity}.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-semibold text-slate-300">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-orange-400" />
                  <span>Free Delivery & Installation</span>
                </div>
                <span className="text-slate-600">·</span>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% Verified Working Gear</span>
                </div>
                <span className="text-slate-600">·</span>
                <div className="flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4 text-blue-400" />
                  <span>Pre-loaded with Top Games</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rental Date Selector Widget */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RentalDateSelector
            selectedDuration={selectedDuration}
            onDurationChange={setSelectedDuration}
            startDate={startDate}
            onStartDateChange={setStartDate}
            isPricesUnlocked={isPricesUnlocked}
            onUnlockPrices={() => {
              setIsPricesUnlocked(true);
              showToast('Prices unlocked! Showing live rental rates.');
            }}
          />
        </div>

        {/* Product Grid Section (100 Unique Models + Price Blur + Auto Scroll) */}
        <ProductGrid
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          selectedDuration={selectedDuration}
          wishlistIds={wishlistIds}
          isPricesUnlocked={isPricesUnlocked}
          onUnlockPrices={() => {
            setIsPricesUnlocked(true);
            showToast('Prices unlocked! Showing live rental rates.');
          }}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onSelectProduct={setSelectedProduct}
        />

        {/* Trust Metrics Section */}
        <TrustMetrics />

        {/* Customer Testimonials & Orders Social Proof */}
        <TestimonialsSection />

        {/* FAQ Section */}
        <FAQSection />

        {/* Related Categories */}
        <RelatedCategories />

      </main>

      {/* Footer */}
      <Footer />

      {/* AI Chat Widget */}
      <AIChatWidget />

      {/* Modals & Slide-over Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        selectedDuration={selectedDuration}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      <CityModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <Toast
        message={toastMessage}
        isOpen={isToastOpen}
        onClose={() => setIsToastOpen(false)}
      />

    </div>
  );
}
