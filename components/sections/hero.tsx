'use client';

import { ArrowRight, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f8f5f0] via-[#f8f5f0] to-[#f8f5f0]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Coffee className="h-8 w-8 text-[#d47d44]" />
            <span className="font-poppins font-medium text-[#4b5563]">Welcome to</span>
          </div>
          
          <h1 className="font-poppins font-bold text-4xl md:text-6xl lg:text-7xl text-[#333] mb-6 tracking-tight">
            Dev<span className="text-[#d47d44]">Blog</span>
          </h1>
          
          <p className="font-lato text-lg md:text-xl text-[#4b5563] mb-8 max-w-2xl mx-auto leading-relaxed">
            A minimal, modern space where developers share insights, tutorials, and thoughts 
            on software development and technology.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-[#d47d44] hover:bg-[#d47d44]/90 text-white font-lato group"
              onClick={() => document.getElementById('posts-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Posts
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button variant="outline" size="lg" asChild className="font-lato">
              <a href="#about">Learn More</a>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#d47d44]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-64 h-64 bg-[#4b5563]/5 rounded-full blur-2xl" />
    </section>
  );
}