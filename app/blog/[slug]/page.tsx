import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PostContent } from '@/components/blog/post-content';
import { CommentSection } from '@/components/blog/comment-section';
import { ShareButtons } from '@/components/blog/share-buttons';
import { supabase } from '@/lib/supabase';
import { formatReadingTime } from '@/lib/utils/reading-time';
import Link from 'next/link';

interface PostPageProps {
  params: {
    slug: string;
  };
}

async function getPost(slug: string) {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      post_categories(
        categories(*)
      )
    `)
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | DevBlog`,
    description: post.excerpt,
    keywords: post.post_categories?.map((pc) => pc.categories.name),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      images: post.cover_image ? [{ url: post.cover_image }] : [],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Button asChild variant="ghost" className="group">
            <Link href="/" className="flex items-center text-slate-600 hover:text-black">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Posts
            </Link>
          </Button>
        </div>

        {/* Post Header */}
        <header className="mb-8">
          {/* Categories */}
          {post.post_categories && post.post_categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.post_categories.map(({ categories }) => (
                <Badge 
                  key={categories.id} 
                 className="bg-slate-100 text-slate-700 font-lato"
                >
                  {categories.name}
                </Badge>
              ))}
            </div>
          )}

          <h1 className="font-poppins font-bold text-3xl md:text-4xl lg:text-5xl text-black mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 font-lato mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.created_at}>
                {format(new Date(post.created_at), 'MMMM d, yyyy')}
              </time>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{formatReadingTime(post.reading_time)}</span>
            </div>

            <ShareButtons url={`/blog/${post.slug}`} title={post.title} />
          </div>

          {post.cover_image && (
            <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8">
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </header>

        {/* Post Content */}
        <div className="mb-12">
          <PostContent content={post.content} />
        </div>

        {/* Comments */}
        <CommentSection postId={post.id} />
      </article>
    </div>
  );
}