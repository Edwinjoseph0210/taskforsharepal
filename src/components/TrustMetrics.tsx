import React from 'react';
import { TRUST_METRICS } from '../data/mockData';
import { ShieldCheck, Leaf, PackageCheck } from 'lucide-react';

export const TrustMetrics: React.FC = () => {
  const getIcon = (idx: number) => {
    if (idx === 0) return <ShieldCheck className="w-6 h-6 text-orange-500" />;
    if (idx === 1) return <Leaf className="w-6 h-6 text-emerald-500" />;
    return <PackageCheck className="w-6 h-6 text-blue-500" />;
  };

  return (
    <div className="bg-white border-y border-slate-200 py-10 my-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TRUST_METRICS.map((metric, idx) => (
            <div key={idx} className="flex items-center gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-xs">
                {getIcon(idx)}
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">
                  {metric.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-0.5">
                  {metric.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
