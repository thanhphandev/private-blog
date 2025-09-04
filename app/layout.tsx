import './globals.css';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ReactQueryProvider } from '@/lib/providers';
import { Toaster } from '@/components/ui/sonner';
import { poppins, lato } from '@/lib/fonts';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'DevBlog - A Modern Developer Blog',
  description: 'A minimal, modern blog for developers sharing insights, tutorials, and thoughts on software development.',
  keywords: ['blog', 'development', 'programming', 'tutorials', 'technology'],
  authors: [{ name: 'DevBlog' }],
  openGraph: {
    title: 'DevBlog - A Modern Developer Blog',
    description: 'A minimal, modern blog for developers sharing insights, tutorials, and thoughts on software development.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(poppins.variable, lato.variable)}>
      <body className="min-h-screen bg-white font-lato">
        <ReactQueryProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}