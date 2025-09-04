'use client';

import { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { usePosts, useDeletePost } from '@/lib/hooks/use-posts';
import { Edit, Trash2, Plus, Eye } from 'lucide-react';

export function PostsList() {
  const { data: posts, isLoading } = usePosts(undefined, undefined, undefined);
  const deletePost = useDeletePost();

  const handleDelete = async (postId: string) => {
    try {
      await deletePost.mutateAsync(postId);
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="h-16 bg-neutral-100 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-poppins font-bold text-2xl text-black">All Posts</h2>
        <Button asChild className="bg-black hover:bg-slate-800 text-white">
          <Link href="/admin/posts/new">
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Link>
        </Button>
      </div>

      {posts && posts.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          <div className="divide-y divide-slate-200">
            {posts.map((post) => (
              <div key={post.id} className="p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-poppins font-semibold text-black truncate">
                        {post.title}
                      </h3>
                      <Badge 
                        variant={post.published ? 'default' : 'secondary'}
                        className={post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                      >
                        {post.published ? 'Published' : 'Draft'}
                      </Badge>
                    </div>
                    <p className="font-lato text-sm text-slate-600 mb-2 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-slate-500 font-lato">
                      <span>Created {format(new Date(post.created_at), 'MMM d, yyyy')}</span>
                      <span>{post.reading_time} min read</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    {post.published && (
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/blog/${post.slug}`} target="_blank">
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/admin/posts/${post.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Post</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{post.title}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleDelete(post.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="font-lato text-slate-600 mb-4">No posts created yet.</p>
          <Button asChild className="bg-black hover:bg-slate-800 text-white">
            <Link href="/admin/posts/new">Create Your First Post</Link>
          </Button>
        </div>
      )}
    </div>
  );
}