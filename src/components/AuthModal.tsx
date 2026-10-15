import React, { useState } from 'react';
import { X, User, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp' | 'success'>('phone');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'phone' && (
          <div>
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mb-4">
              <User className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-1">Login or Sign Up</h3>
            <p className="text-xs text-slate-500 mb-6">Enter your mobile number to access your rentals and wishlist.</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (phone.length < 10) {
                  alert('Please enter a valid phone number');
                  return;
                }
                setStep('otp');
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number</label>
                <div className="flex items-center rounded-xl border border-slate-300 overflow-hidden focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20">
                  <span className="bg-slate-100 px-3 py-2.5 text-xs font-bold text-slate-600 border-r border-slate-300">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98765 43210"
                    className="w-full px-3.5 py-2.5 text-sm outline-none bg-transparent"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-2"
              >
                <span>Continue with OTP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {step === 'otp' && (
          <div>
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mb-4">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-1">Verify OTP</h3>
            <p className="text-xs text-slate-500 mb-6">Enter the 6-digit code sent to +91 {phone}</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep('success');
              }}
              className="space-y-4"
            >
              <div>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  className="w-full text-center tracking-widest text-lg font-bold px-3.5 py-3 rounded-xl border border-slate-300 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-orange-500/30 transition-all"
              >
                Verify & Login
              </button>
            </form>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-2">Welcome to SharePal!</h3>
            <p className="text-xs text-slate-600 mb-6">
              You are successfully logged in. Enjoy your gaming rentals.
            </p>
            <button
              onClick={onClose}
              className="px-8 py-3 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors"
            >
              Start Renting
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
