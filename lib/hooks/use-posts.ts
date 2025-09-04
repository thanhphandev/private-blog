'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';
import type { Database } from '../supabase';
import { calculateReadingTime } from '../utils/reading-time';

type Post = Database['public']['Tables']['posts']['Row'];
type PostInsert = Database['public']['Tables']['posts']['Insert'];
type PostUpdate = Database['public']['Tables']['posts']['Update'];

export function usePosts(searchQuery?: string, categoryId?: string, published?: boolean) {
  return useQuery({
    queryKey: ['posts', searchQuery, categoryId, published],
    queryFn: async () => {
      let query = supabase
        .from('posts')
        .select(`
          *,
          post_categories(
            categories(*)
          )
        `)
        .order('created_at', { ascending: false });

      if (published !== undefined) {
        query = query.eq('published', published);
      }

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%, content.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    },
  });
}

export function usePost(slug: string) {
  return useQuery({
    queryKey: ['post', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          post_categories(
            categories(*)
          ),
          comments(
            *,
            profiles(username, avatar_url)
          )
        `)
        .eq('slug', slug)
        .single();

      if (error) throw error;
      return data;
    },
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (post: PostInsert) => {
      const readingTime = calculateReadingTime(post.content);
      const { data, error } = await supabase
        .from('posts')
        .insert({ ...post, reading_time: readingTime })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...post }: PostUpdate & { id: string }) => {
      const readingTime = post.content ? calculateReadingTime(post.content) : undefined;
      const { data, error } = await supabase
        .from('posts')
        .update({ ...post, reading_time: readingTime, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}