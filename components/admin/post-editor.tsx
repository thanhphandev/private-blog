'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PostContent } from '@/components/blog/post-content';
import { useCategories } from '@/lib/hooks/use-categories';
import { useCreatePost, useUpdatePost } from '@/lib/hooks/use-posts';
import { postSchema, type PostFormData } from '@/lib/schemas/post';
import { createSlug } from '@/lib/utils/slug';
import { calculateReadingTime } from '@/lib/utils/reading-time';
import { Save, Eye, FileText } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

interface PostEditorProps {
  post?: any;
  onSave?: () => void;
}

export function PostEditor({ post, onSave }: PostEditorProps) {
  const [activeTab, setActiveTab] = useState('edit');
  const { data: categories } = useCategories();
  const createPost = useCreatePost();
  const updatePost = useUpdatePost();

  const form = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title || '',
      content: post?.content || '',
      excerpt: post?.excerpt || '',
      published: post?.published || false,
      cover_image: post?.cover_image || '',
      category_ids: post?.post_categories?.map((pc: any) => pc.category_id) || [],
    },
  });

  const watchedContent = form.watch('content');
  const watchedTitle = form.watch('title');

  useEffect(() => {
    if (watchedTitle && !post) {
      // Auto-generate slug for new posts
      const slug = createSlug(watchedTitle);
      form.setValue('slug', slug);
    }
  }, [watchedTitle, form, post]);

  const onSubmit = async (data: PostFormData) => {
    try {
      const postData = {
        ...data,
        slug: post?.slug || createSlug(data.title),
        author_id: 'user-id-placeholder', // This should come from auth
        excerpt: data.excerpt || data.content.slice(0, 200) + '...',
      };

      if (post) {
        await updatePost.mutateAsync({ id: post.id, ...postData });
      } else {
        await createPost.mutateAsync(postData);
      }

      onSave?.();
    } catch (error) {
      console.error('Failed to save post:', error);
    }
  };

  const readingTime = calculateReadingTime(watchedContent || '');

  return (
    <div className="max-w-6xl mx-auto">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Header Controls */}
        <div className="flex items-center justify-between">
          <h2 className="font-poppins font-bold text-2xl text-[#333]">
            {post ? 'Edit Post' : 'Create New Post'}
          </h2>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch {...form.register('published')} />
              <Label className="font-lato text-sm">Published</Label>
            </div>
            <Button 
              type="submit" 
              disabled={createPost.isPending || updatePost.isPending}
              className="bg-[#d47d44] hover:bg-[#d47d44]/90 text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              {createPost.isPending || updatePost.isPending ? 'Saving...' : 'Save Post'}
            </Button>
          </div>
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="font-lato font-medium">Title</Label>
              <Input
                id="title"
                {...form.register('title')}
                placeholder="Enter post title"
                className="mt-1"
              />
              {form.formState.errors.title && (
                <p className="text-red-600 text-sm mt-1">{form.formState.errors.title.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="cover_image" className="font-lato font-medium">Cover Image URL</Label>
              <Input
                id="cover_image"
                {...form.register('cover_image')}
                placeholder="https://example.com/image.jpg"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="excerpt" className="font-lato font-medium">Excerpt</Label>
              <Textarea
                id="excerpt"
                {...form.register('excerpt')}
                placeholder="Brief description of the post..."
                className="mt-1 h-20 resize-none"
              />
            </div>

            {/* Categories */}
            {categories && categories.length > 0 && (
              <div>
                <Label className="font-lato font-medium mb-3 block">Categories</Label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={category.id}
                        value={category.id}
                        {...form.register('category_ids')}
                      />
                      <Label htmlFor={category.id} className="font-lato text-sm">
                        {category.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="bg-neutral-50 rounded-lg p-4 space-y-2">
            <h4 className="font-poppins font-medium text-[#333] mb-3">Post Statistics</h4>
            <div className="flex items-center justify-between text-sm">
              <span className="font-lato text-[#4b5563]">Reading Time:</span>
              <span className="font-lato font-medium">{readingTime} min</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-lato text-[#4b5563]">Word Count:</span>
              <span className="font-lato font-medium">
                {watchedContent ? watchedContent.split(/\s+/).length : 0}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-lato text-[#4b5563]">Status:</span>
              <span className="font-lato font-medium">
                {form.watch('published') ? 'Published' : 'Draft'}
              </span>
            </div>
          </div>
        </div>

        {/* Content Editor */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="edit" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Edit
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="edit" className="mt-4">
            <div>
              <Label htmlFor="content" className="font-lato font-medium">Content (Markdown)</Label>
              <Textarea
                id="content"
                {...form.register('content')}
                placeholder="Write your post content in Markdown..."
                className="mt-1 min-h-[500px] font-mono text-sm resize-none"
              />
              {form.formState.errors.content && (
                <p className="text-red-600 text-sm mt-1">{form.formState.errors.content.message}</p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="mt-4">
            <div className="border border-neutral-200 rounded-lg p-6 min-h-[500px] bg-white">
              <h1 className="font-poppins font-bold text-3xl text-[#333] mb-6">
                {watchedTitle || 'Preview Title'}
              </h1>
              {watchedContent ? (
                <PostContent content={watchedContent} />
              ) : (
                <p className="font-lato text-[#4b5563] italic">Start writing to see the preview...</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  );
}