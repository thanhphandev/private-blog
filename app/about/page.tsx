import { Metadata } from 'next';
import Image from 'next/image';
import { Code, Coffee, Heart, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About | DevBlog',
  description: 'Learn more about DevBlog and the developer behind the content.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="font-poppins font-bold text-4xl md:text-5xl text-black mb-6">
            About <span className="text-slate-600">DevBlog</span>
          </h1>
          <p className="font-lato text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            A minimal, modern space where passion for development meets clean design and thoughtful content.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="relative h-96 rounded-2xl overflow-hidden bg-slate-100">
              <Image
                src="https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg"
                alt="Developer workspace"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-poppins font-semibold text-3xl text-black">
              Crafted with Care
            </h2>
            
            <p className="font-lato text-lg text-slate-600 leading-relaxed">
              This blog is more than just a collection of posts—it's a carefully crafted platform 
              built with modern web technologies and designed with a focus on readability and user experience.
            </p>

            <p className="font-lato text-lg text-slate-600 leading-relaxed">
              Every aspect, from the Scandinavian-inspired design to the thoughtful typography choices, 
              reflects a commitment to quality and attention to detail that developers appreciate.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3">
                <div className="bg-slate-100 p-2 rounded-lg">
                  <Code className="h-5 w-5 text-black" />
                </div>
                <span className="font-lato font-medium text-black">Clean Code</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-slate-100 p-2 rounded-lg">
                  <Coffee className="h-5 w-5 text-black" />
                </div>
                <span className="font-lato font-medium text-black">Thoughtful Design</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-slate-100 p-2 rounded-lg">
                  <BookOpen className="h-5 w-5 text-black" />
                </div>
                <span className="font-lato font-medium text-black">Quality Content</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-slate-100 p-2 rounded-lg">
                  <Heart className="h-5 w-5 text-black" />
                </div>
                <span className="font-lato font-medium text-black">Built with Love</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-slate-50 rounded-2xl p-8 md:p-12 border border-slate-200 shadow-sm">
          <div className="text-center mb-8">
            <h3 className="font-poppins font-semibold text-2xl text-black mb-4">Our Mission</h3>
            <p className="font-lato text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
              To create a space where developers can share knowledge, learn from each other, 
              and find inspiration in the ever-evolving world of technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-black" />
              </div>
              <h4 className="font-poppins font-medium text-xl text-black mb-3">Share Knowledge</h4>
              <p className="font-lato text-slate-600 leading-relaxed">
                Breaking down complex concepts into digestible, actionable insights that help developers grow.
              </p>
            </div>

            <div>
              <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="h-8 w-8 text-black" />
              </div>
              <h4 className="font-poppins font-medium text-xl text-black mb-3">Best Practices</h4>
              <p className="font-lato text-slate-600 leading-relaxed">
                Showcasing modern development techniques, tools, and methodologies that matter in today's tech landscape.
              </p>
            </div>

            <div>
              <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-black" />
              </div>
              <h4 className="font-poppins font-medium text-xl text-black mb-3">Community</h4>
              <p className="font-lato text-slate-600 leading-relaxed">
                Building a supportive community where developers can connect, discuss, and learn together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}