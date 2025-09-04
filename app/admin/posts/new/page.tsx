'use client';

import { useRouter } from 'next/navigation';
import { PostEditor } from '@/components/admin/post-editor';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NewPostPage() {
  const router = useRouter();

  const handleSave = () => {
    router.push('/admin/posts');
  };

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

      <PostEditor onSave={handleSave} />
    </div>
  );
}