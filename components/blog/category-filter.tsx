'use client';

import { Badge } from '@/components/ui/badge';
import { useCategories } from '@/lib/hooks/use-categories';
import { useBlogStore } from '@/lib/store';

export function CategoryFilter() {
  const { data: categories, isLoading } = useCategories();
  const { selectedCategory, setSelectedCategory } = useBlogStore();

  if (isLoading || !categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <Badge
        variant={selectedCategory === null ? 'default' : 'secondary'}
        className={`cursor-pointer transition-colors duration-200 font-lato border ${
          selectedCategory === null 
            ? 'bg-black hover:bg-slate-800 text-white border-black' 
            : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
        }`}
        onClick={() => setSelectedCategory(null)}
      >
        All Categories
      </Badge>
      
      {categories.map((category) => (
        <Badge
          key={category.id}
          variant={selectedCategory === category.id ? 'default' : 'secondary'}
          className={`cursor-pointer transition-colors duration-200 font-lato border ${
            selectedCategory === category.id 
              ? 'bg-black hover:bg-slate-800 text-white border-black' 
              : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
          }`}
          onClick={() => setSelectedCategory(category.id)}
        >
          {category.name}
        </Badge>
      ))}
    </div>
  );
}