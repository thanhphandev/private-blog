import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-poppins font-bold text-lg text-black mb-4">DevBlog</h3>
            <p className="font-lato text-slate-600 text-sm leading-relaxed max-w-md">
              A minimal, modern blog for developers. Sharing insights, tutorials, and thoughts on 
              software development and technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-poppins font-semibold text-black mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="font-lato text-slate-600 hover:text-black transition-colors text-sm">Home</Link></li>
              <li><Link href="/about" className="font-lato text-slate-600 hover:text-black transition-colors text-sm">About</Link></li>
              <li><Link href="/contact" className="font-lato text-slate-600 hover:text-black transition-colors text-sm">Contact</Link></li>
              <li><Link href="/rss" className="font-lato text-slate-600 hover:text-black transition-colors text-sm">RSS Feed</Link></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-poppins font-semibold text-black mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-600 hover:text-black transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-600 hover:text-black transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-600 hover:text-black transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-8 pt-8 text-center">
          <p className="font-lato text-slate-600 text-sm">
            © {currentYear} DevBlog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}