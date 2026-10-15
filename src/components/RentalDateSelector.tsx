import React, { useState } from 'react';
import { Calendar, Clock, Check, ChevronDown, Unlock } from 'lucide-react';

interface RentalDateSelectorProps {
  selectedDuration: number;
  onDurationChange: (months: number) => void;
  startDate: string;
  onStartDateChange: (date: string) => void;
  isPricesUnlocked: boolean;
  onUnlockPrices: () => void;
}

export const RentalDateSelector: React.FC<RentalDateSelectorProps> = ({
  selectedDuration,
  onDurationChange,
  startDate,
  onStartDateChange,
  isPricesUnlocked,
  onUnlockPrices,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const durations = [
    { months: 1, label: '1 Month (Min. Period)', discount: 'Standard Price' },
    { months: 2, label: '2 Months', discount: 'Save 5%' },
    { months: 3, label: '3 Months', discount: 'Save 10%' },
    { months: 6, label: '6 Months', discount: 'Save 15% (Best Value)' },
  ];

  const currentDurationLabel = durations.find((d) => d.months === selectedDuration)?.label || '1 Month';

  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-4 sm:p-6 shadow-xl my-6 border border-slate-700/60">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>Select Rental Tenure & Start Date</span>
              <span className="text-[10px] bg-orange-500 text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Live Pricing
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Select rental dates to unlock prices and view live availability in Bangalore.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Start Date Picker */}
          <div className="relative">
            <label className="block text-[11px] font-semibold text-slate-400 mb-1 uppercase tracking-wider">
              Rental Start Date
            </label>
            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm font-medium text-white hover:border-slate-600 transition-colors">
              <Calendar className="w-4 h-4 text-orange-400" />
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  onStartDateChange(e.target.value);
                  onUnlockPrices();
                }}
                className="bg-transparent border-none outline-none text-white text-xs sm:text-sm cursor-pointer w-full"
              />
            </div>
          </div>

          {/* Duration Selector Dropdown / Buttons */}
          <div className="relative">
            <label className="block text-[11px] font-semibold text-slate-400 mb-1 uppercase tracking-wider">
              Rental Tenure
            </label>
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full sm:w-56 flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm font-medium text-white hover:border-slate-600 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-400" />
                  <span className="truncate">{currentDurationLabel}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl py-2 z-50">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Select Tenure
                  </div>
                  {durations.map((d) => (
                    <button
                      key={d.months}
                      onClick={() => {
                        onDurationChange(d.months);
                        onUnlockPrices();
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-xs sm:text-sm text-left hover:bg-slate-800 transition-colors cursor-pointer ${
                        selectedDuration === d.months ? 'text-orange-400 font-bold bg-slate-800/50' : 'text-slate-300'
                      }`}
                    >
                      <span>{d.label}</span>
                      <span className="text-[11px] text-orange-400 font-semibold">{d.discount}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Unlock Button Quick Action */}
          {!isPricesUnlocked && (
            <div className="flex items-end">
              <button
                onClick={onUnlockPrices}
                className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 h-[42px] cursor-pointer"
              >
                <Unlock className="w-4 h-4" />
                <span>Unlock Prices</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
