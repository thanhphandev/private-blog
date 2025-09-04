'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface PostContentProps {
  content: string;
}

export function PostContent({ content }: PostContentProps) {
  return (
    <div className="prose prose-lg max-w-none font-lato text-[#333]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="font-poppins font-bold text-3xl text-[#333] mb-6 mt-8">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-poppins font-semibold text-2xl text-[#333] mb-4 mt-6">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-poppins font-semibold text-xl text-[#333] mb-3 mt-5">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="text-[#4b5563] leading-relaxed mb-4">{children}</p>
          ),
          a: ({ href, children }) => (
            <a 
              href={href} 
              className="text-[#d47d44] hover:text-[#d47d44]/80 underline decoration-2 underline-offset-2 transition-colors"
              target="_blank" 
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          code: ({ node, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <SyntaxHighlighter
                style={oneLight}
                language={match[1]}
                PreTag="div"
                className="rounded-lg border border-neutral-200"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code 
                className="bg-neutral-100 px-1.5 py-0.5 rounded text-sm font-mono text-[#d47d44]" 
                {...props}
              >
                {children}
              </code>
            );
          },
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[#d47d44] pl-4 italic text-[#4b5563] my-6">
              {children}
            </blockquote>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-2 mb-4 text-[#4b5563]">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-2 mb-4 text-[#4b5563]">{children}</ol>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}