'use client';

import { usePosts } from '@/lib/hooks/use-posts';
import { useCategories } from '@/lib/hooks/use-categories';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Eye, FolderOpen, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { formatReadingTime } from '@/lib/utils/reading-time';

export default function AdminDashboard() {
  const { data: posts } = usePosts();
  const { data: categories } = useCategories();

  const publishedPosts = posts?.filter(post => post.published) || [];
  const draftPosts = posts?.filter(post => !post.published) || [];

  const stats = [
    {
      title: 'Total Posts',
      value: posts?.length || 0,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Published',
      value: publishedPosts.length,
      icon: Eye,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Drafts',
      value: draftPosts.length,
      icon: FileText,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Categories',
      value: categories?.length || 0,
      icon: FolderOpen,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-poppins font-bold text-3xl text-[#333] mb-2">Dashboard</h1>
        <p className="font-lato text-[#4b5563]">Welcome back! Here's an overview of your blog.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-neutral-200 hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-lato text-sm font-medium text-[#4b5563]">
                {stat.title}
              </CardTitle>
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="font-poppins text-2xl font-bold text-[#333]">
                {stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Posts */}
      <Card className="border-neutral-200">
        <CardHeader>
          <CardTitle className="font-poppins font-semibold text-xl text-[#333]">
            Recent Posts
          </CardTitle>
        </CardHeader>
        <CardContent>
          {posts && posts.length > 0 ? (
            <div className="space-y-4">
              {posts.slice(0, 5).map((post) => (
                <div key={post.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-neutral-50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-poppins font-medium text-[#333] truncate">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="font-lato text-xs text-[#4b5563]">
                        {format(new Date(post.created_at), 'MMM d, yyyy')}
                      </span>
                      <Badge 
                        variant={post.published ? 'default' : 'secondary'}
                        className={`text-xs ${
                          post.published 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {post.published ? 'Published' : 'Draft'}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <span className="font-lato text-xs text-[#4b5563]">
                      {formatReadingTime(post.reading_time)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
              <p className="font-lato text-[#4b5563]">No posts created yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}