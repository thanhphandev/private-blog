'use client';

import { Button } from '@/components/ui/button';
import { Twitter, Linkedin, Facebook, Link as LinkIcon } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${url}` : url;

  const shareButtons = [
    {
      name: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`,
      className: 'hover:bg-blue-50 hover:text-blue-600',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
      className: 'hover:bg-blue-50 hover:text-blue-700',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
      className: 'hover:bg-blue-50 hover:text-blue-800',
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullUrl);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="flex items-center gap-2">
      <span className="font-lato text-sm text-slate-500 mr-2">Share:</span>
      
      {shareButtons.map((button) => (
        <Button
          key={button.name}
          variant="ghost"
          size="sm"
          asChild
          className={`${button.className} transition-colors duration-200`}
        >
          <a 
            href={button.href} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={`Share on ${button.name}`}
          >
            <button.icon className="h-4 w-4" />
          </a>
        </Button>
      ))}
      
      <Button
        variant="ghost"
        size="sm"
        onClick={copyToClipboard}
        className="hover:bg-slate-50 hover:text-black transition-colors duration-200"
        aria-label="Copy link"
      >
        <LinkIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}