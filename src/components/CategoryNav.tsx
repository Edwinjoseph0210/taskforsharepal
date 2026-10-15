import React from 'react';
import { CATEGORIES } from '../data/mockData';
import { Gamepad2, Tv, Glasses, MonitorPlay, Compass, Disc, Layers } from 'lucide-react';

interface CategoryNavProps {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({ selectedCategory, onSelectCategory }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Gamepad2': return <Layers className="w-4 h-4" />;
      case 'Playstation': return <Gamepad2 className="w-4 h-4" />;
      case 'Tv': return <Tv className="w-4 h-4" />;
      case 'Glasses': return <Glasses className="w-4 h-4" />;
      case 'MonitorPlay': return <MonitorPlay className="w-4 h-4" />;
      case 'Compass': return <Compass className="w-4 h-4" />;
      case 'Disc': return <Disc className="w-4 h-4" />;
      default: return <Gamepad2 className="w-4 h-4" />;
    }
  };

  const handleCategoryClick = (id: string) => {
    onSelectCategory(id);
    // Scroll smoothly to products section
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-white border-b border-slate-200 py-3 overflow-x-auto scrollbar-none sticky top-20 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5 min-w-max">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25 scale-[1.02]'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {getIcon(cat.icon)}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
