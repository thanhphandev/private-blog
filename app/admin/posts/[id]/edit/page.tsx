'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { PostEditor } from '@/components/admin/post-editor';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

interface EditPostPageProps {
  params: {
    id: string;
  };
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const router = useRouter();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['post', params.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          post_categories(
            category_id,
            categories(*)
          )
        `)
        .eq('id', params.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const handleSave = () => {
    router.push('/admin/posts');
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-neutral-200 rounded animate-pulse" />
        <div className="h-96 bg-neutral-200 rounded animate-pulse" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="text-center py-12">
        <p className="font-lato text-red-600">Failed to load post. Please try again.</p>
        <Button asChild className="mt-4">
          <Link href="/admin/posts">Back to Posts</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="sm">
          <Link href="/admin/posts" className="flex items-center text-[#4b5563] hover:text-[#333]">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Posts
          </Link>
        </Button>
      </div>

      <PostEditor post={post} onSave={handleSave} />
    </div>
  );
}