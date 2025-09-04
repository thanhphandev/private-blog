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
        className={`cursor-pointer transition-colors duration-200 font-lato ${
          selectedCategory === null 
            ? 'bg-[#d47d44] hover:bg-[#d47d44]/90 text-white' 
            : 'bg-neutral-100 hover:bg-neutral-200 text-[#333]'
        }`}
        onClick={() => setSelectedCategory(null)}
      >
        All Categories
      </Badge>
      
      {categories.map((category) => (
        <Badge
          key={category.id}
          variant={selectedCategory === category.id ? 'default' : 'secondary'}
          className={`cursor-pointer transition-colors duration-200 font-lato ${
            selectedCategory === category.id 
              ? 'bg-[#d47d44] hover:bg-[#d47d44]/90 text-white' 
              : 'bg-neutral-100 hover:bg-neutral-200 text-[#333]'
          }`}
          onClick={() => setSelectedCategory(category.id)}
        >
          {category.name}
        </Badge>
      ))}
    </div>
  );
}