import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, ShoppingBag, Trash2, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onClearCart,
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');

  if (!isOpen) return null;

  // Calculate totals
  const totalRent = cartItems.reduce((acc, item) => {
    const mult = item.durationMonths === 6 ? 0.85 : item.durationMonths === 3 ? 0.90 : item.durationMonths === 2 ? 0.95 : 1.0;
    return acc + Math.round(item.product.pricePerMonth * mult) * item.durationMonths;
  }, 0);

  const totalDeposit = cartItems.reduce((acc, item) => acc + item.product.deposit, 0);
  const grandTotal = totalRent + totalDeposit;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address || !pincode) {
      alert('Please fill in all delivery details.');
      return;
    }
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-bold text-slate-900">Your Rental Cart</h2>
              <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {step === 'cart' && (
              <div>
                {cartItems.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">Your cart is empty</h3>
                    <p className="text-xs text-slate-500 mb-6">
                      Explore our gaming gear in Bangalore and add your favorite console to rent.
                    </p>
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 bg-orange-500 text-white text-xs font-bold rounded-xl shadow-md shadow-orange-500/20 hover:bg-orange-600 transition-all"
                    >
                      Browse Gaming Gadgets
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item, idx) => {
                      const mult = item.durationMonths === 6 ? 0.85 : item.durationMonths === 3 ? 0.90 : item.durationMonths === 2 ? 0.95 : 1.0;
                      const itemMonthly = Math.round(item.product.pricePerMonth * mult);

                      return (
                        <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 relative">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-20 h-20 object-cover rounded-xl bg-white shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-slate-900 text-sm truncate">
                              {item.product.name}
                            </h4>
                            <div className="text-xs text-slate-500 mt-0.5">
                              Tenure: <span className="font-semibold text-slate-700">{item.durationMonths} {item.durationMonths === 1 ? 'Month' : 'Months'}</span>
                            </div>
                            <div className="text-xs text-slate-500">
                              Start Date: <span className="font-semibold text-slate-700">{item.startDate}</span>
                            </div>
                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60">
                              <span className="text-sm font-extrabold text-slate-900 tabular-nums">
                                ₹{(itemMonthly * item.durationMonths).toLocaleString('en-IN')}
                              </span>
                              <button
                                onClick={() => onRemoveItem(idx)}
                                className="text-red-500 hover:text-red-700 p-1 transition-colors"
                                title="Remove item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {step === 'checkout' && (
              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Delivery & KYC Details (Bangalore)
                </h3>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Delivery Address in Bangalore</label>
                  <textarea
                    required
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Apartment name, street, locality (e.g. Indiranagar, HSR Layout)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none resize-none"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">PIN Code</label>
                  <input
                    type="text"
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="560038"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none"
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep('cart')}
                    className="w-1/3 py-3 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-3 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Confirm & Place Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {step === 'success' && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-2">Order Confirmed!</h3>
                <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                  Thank you, <span className="font-bold text-slate-900">{name}</span>! Your gaming gear order for Bangalore has been successfully placed. Our executive will call you shortly for delivery confirmation.
                </p>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Order ID:</span>
                    <span className="font-bold text-slate-900">SP-BLR-{Math.floor(100000 + Math.random() * 900000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Delivery Location:</span>
                    <span className="font-bold text-slate-900 truncate max-w-[200px]">{address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total Payable:</span>
                    <span className="font-bold text-orange-600">₹{grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onClearCart();
                    setStep('cart');
                    onClose();
                  }}
                  className="px-8 py-3 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-md"
                >
                  Back to Store
                </button>
              </div>
            )}
          </div>

          {/* Footer Totals & Checkout Trigger */}
          {cartItems.length > 0 && step === 'cart' && (
            <div className="p-6 bg-slate-50 border-t border-slate-200">
              <div className="space-y-2 mb-4 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Rental Subtotal:</span>
                  <span className="font-bold text-slate-900">₹{totalRent.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Refundable Security Deposit:</span>
                  <span className="font-bold text-slate-900">₹{totalDeposit.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Payable:</span>
                  <span className="text-orange-600">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={() => setStep('checkout')}
                className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-2xl shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
