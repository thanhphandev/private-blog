'use client';

import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { Clock, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatReadingTime } from '@/lib/utils/reading-time';
import type { Database } from '@/lib/supabase';

type Post = Database['public']['Tables']['posts']['Row'] & {
  post_categories?: {
    categories: Database['public']['Tables']['categories']['Row'];
  }[];
};

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        {post.cover_image && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        <div className="p-6">
          {/* Categories */}
          {post.post_categories && post.post_categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.post_categories.map(({ categories }) => (
                <Badge 
                  key={categories.id} 
                  variant="secondary" 
                  className="bg-[#d47d44]/10 text-[#d47d44] hover:bg-[#d47d44]/20 font-lato text-xs"
                >
                  {categories.name}
                </Badge>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="font-poppins font-semibold text-xl text-[#333] mb-3 group-hover:text-[#d47d44] transition-colors duration-200 line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="font-lato text-[#4b5563] text-sm leading-relaxed mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Meta information */}
          <div className="flex items-center justify-between text-xs text-[#4b5563] font-lato">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <time dateTime={post.created_at}>
                  {format(new Date(post.created_at), 'MMM d, yyyy')}
                </time>
              </div>
              
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{formatReadingTime(post.reading_time)}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}