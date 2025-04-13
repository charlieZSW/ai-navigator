"use client";

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onChange: (category: string) => void;
}

export default function CategoryTabs({ categories, activeCategory, onChange }: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={`px-4 py-2 rounded-md text-sm transition-all ${
            activeCategory === category
              ? 'bg-blue-500 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
} 