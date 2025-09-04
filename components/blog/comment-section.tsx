'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/lib/hooks/use-auth';
import { useComments, useCreateComment } from '@/lib/hooks/use-comments';
import { commentSchema, type CommentFormData } from '@/lib/schemas/post';
import { MessageSquare, Send } from 'lucide-react';

interface CommentSectionProps {
  postId: string;
}

export function CommentSection({ postId }: CommentSectionProps) {
  const { user } = useAuth();
  const { data: comments, isLoading } = useComments(postId);
  const createComment = useCreateComment();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: '',
      post_id: postId,
    },
  });

  const onSubmit = async (data: CommentFormData) => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      await createComment.mutateAsync({
        ...data,
        author_id: user.id,
      });
      form.reset({ content: '', post_id: postId });
    } catch (error) {
      console.error('Failed to create comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mt-12 pt-8 border-t border-slate-200">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="h-5 w-5 text-black" />
        <h3 className="font-poppins font-semibold text-xl text-black">
          Comments {comments && `(${comments.length})`}
        </h3>
      </div>

      {/* Comment Form */}
      {user ? (
        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8">
          <Textarea
            {...form.register('content')}
            placeholder="Share your thoughts..."
            className="min-h-[100px] resize-none border-slate-200 focus:border-black focus:ring-black/20"
          />
          {form.formState.errors.content && (
            <p className="text-red-600 text-sm mt-1 font-lato">
              {form.formState.errors.content.message}
            </p>
          )}
          <div className="flex justify-end mt-3">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-black hover:bg-slate-800 text-white font-lato"
            >
              <Send className="h-4 w-4 mr-2" />
              {isSubmitting ? 'Posting...' : 'Post Comment'}
            </Button>
          </div>
        </form>
      ) : (
        <div className="bg-slate-50 rounded-lg p-6 text-center mb-8">
          <p className="font-lato text-slate-600 mb-4">Sign in to join the conversation</p>
          <Button asChild className="bg-black hover:bg-slate-800 text-white">
            <Link href="/auth/login">Sign In</Link>
          </Button>
        </div>
      )}

      {/* Comments List */}
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex gap-4 p-4 bg-slate-50 rounded-lg animate-pulse">
              <div className="w-10 h-10 bg-slate-200 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-200 rounded w-1/4" />
                <div className="h-4 bg-slate-200 rounded w-full" />
                <div className="h-4 bg-slate-200 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      ) : comments && comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <Avatar className="w-10 h-10">
                <AvatarImage src={comment.profiles?.avatar_url} />
                <AvatarFallback className="bg-black text-white font-poppins">
                  {comment.profiles?.username?.[0]?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-poppins font-medium text-black">
                    {comment.profiles?.username || 'Anonymous'}
                  </span>
                  <time 
                    className="text-xs text-slate-500 font-lato"
                    dateTime={comment.created_at}
                  >
                    {format(new Date(comment.created_at), 'MMM d, yyyy · h:mm a')}
                  </time>
                </div>
                <p className="font-lato text-slate-600 leading-relaxed">
                  {comment.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <MessageSquare className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <p className="font-lato text-slate-600">No comments yet. Be the first to share your thoughts!</p>
        </div>
      )}
    </section>
  );
}