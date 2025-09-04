'use client';

import { usePosts } from '@/lib/hooks/use-posts';
import { useBlogStore } from '@/lib/store';
import { PostCard } from './post-card';
import { PostCardSkeleton } from '@/components/ui/loading-skeleton';

export function PostGrid() {
  const { searchQuery, selectedCategory } = useBlogStore();
  const { data: posts, isLoading, error } = usePosts(searchQuery, selectedCategory, true);

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 font-lato">Failed to load posts. Please try again later.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <PostCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600 font-lato text-lg">
          {searchQuery || selectedCategory 
            ? 'No posts found matching your criteria.' 
            : 'No posts available yet.'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}