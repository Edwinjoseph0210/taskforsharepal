import React from 'react';
import { Gamepad2, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 text-white mb-4 group">
              <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-md">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-white">
                  Share<span className="text-orange-500">Pal</span>
                </span>
                <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase -mt-1">
                  Gaming on Rent
                </span>
              </div>
            </a>
            <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed max-w-sm">
              SharePal is India's leading rental platform for gaming consoles, VR headsets, and entertainment gadgets. Experience next-gen gaming without the high upfront cost.
            </p>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Indiranagar & HSR Layout Hub, Bangalore, Karnataka</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <span>support@sharepal.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <span>+91 80 4718 2200</span>
              </div>
            </div>
          </div>

          {/* Become a Pal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Become a Pal
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#" className="hover:text-orange-400 transition-colors">List Your Gadgets</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Partner Program</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Corporate Rentals</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Information
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#" className="hover:text-orange-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Bangalore Hub</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Press & Media</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Policies
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#" className="hover:text-orange-400 transition-colors">Rental Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Refund & Deposit Policy</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Shipping & Delivery</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} SharePal Technologies Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-orange-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Security</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
