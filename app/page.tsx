'use client';

import { Hero } from '@/components/sections/hero';
import { PostGrid } from '@/components/blog/post-grid';
import { CategoryFilter } from '@/components/blog/category-filter';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Blog Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <CategoryFilter />

        {/* Posts Grid */}
        <PostGrid />
      </section>
    </div>
  );
}