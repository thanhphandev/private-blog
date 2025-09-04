import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().max(500, 'Excerpt must be less than 500 characters').optional(),
  published: z.boolean().default(false),
  cover_image: z.string().url().optional(),
  category_ids: z.array(z.string()).optional(),
});

export const commentSchema = z.object({
  content: z.string().min(1, 'Comment is required').max(1000, 'Comment must be less than 1000 characters'),
  post_id: z.string(),
});

export type PostFormData = z.infer<typeof postSchema>;
export type CommentFormData = z.infer<typeof commentSchema>;