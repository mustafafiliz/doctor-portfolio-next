'use client';

import { useTranslations } from '@/components/I18nProvider';
import Link from 'next/link';
import { Calendar, ArrowLeft } from 'lucide-react';
import { type Locale } from '@/lib/i18n';
import { getRoute } from '@/lib/routes';
import Image from 'next/image';
import type { Blog } from '@/lib/types';

interface BlogPostProps {
  post: Blog;
  locale: Locale;
}

export function BlogPost({ post, locale }: BlogPostProps) {
  const t = useTranslations('blog');
  const currentLocale = locale;

  return (
    <main className="container mx-auto px-4 pt-5 pb-16 md:pb-24">
      {/* Back Button */}
      <div className="mb-6 max-w-4xl mx-auto">
        <Link 
          href={`/${currentLocale}${getRoute('blog', currentLocale)}`}
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Tüm Blog Yazıları
        </Link>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold mb-6">{post.title}</h2>
        
        {/* Featured Image */}
        <div className="mb-8">
          <div className="relative w-full h-64 md:h-96 rounded-sm shadow-lg overflow-hidden bg-muted">
            {post.image ? (
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-gradient-to-br from-primary/10 to-accent/10">
                <span className="text-2xl">📸</span>
              </div>
            )}
          </div>
        </div>

        {/* Excerpt */}
        {post.excerpt && (
          <div className="text-lg text-muted-foreground font-medium mb-8 leading-relaxed">
            {post.excerpt}
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none blog-content">
          <div 
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="text-gray-700 leading-relaxed"
          />
        </div>

        {/* Blog Content Styles */}
        <style jsx global>{`
          .blog-content h1 {
            font-size: 2.5rem;
            font-weight: 700;
            line-height: 1.2;
            margin-top: 2rem;
            margin-bottom: 1rem;
            color: #1f2937;
          }
          
          .blog-content h2 {
            font-size: 2rem;
            font-weight: 600;
            line-height: 1.3;
            margin-top: 1.75rem;
            margin-bottom: 0.875rem;
            color: #374151;
          }
          
          .blog-content h3 {
            font-size: 1.5rem;
            font-weight: 600;
            line-height: 1.4;
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
            color: #4b5563;
          }
          
          .blog-content h4 {
            font-size: 1.25rem;
            font-weight: 600;
            line-height: 1.5;
            margin-top: 1.25rem;
            margin-bottom: 0.625rem;
            color: #6b7280;
          }
          
          .blog-content h5 {
            font-size: 1.125rem;
            font-weight: 600;
            line-height: 1.5;
            margin-top: 1rem;
            margin-bottom: 0.5rem;
            color: #6b7280;
          }
          
          .blog-content h6 {
            font-size: 1rem;
            font-weight: 600;
            line-height: 1.5;
            margin-top: 0.875rem;
            margin-bottom: 0.5rem;
            color: #6b7280;
          }
          
          .blog-content p {
            margin-bottom: 1.25rem;
            line-height: 1.75;
          }
          
          .blog-content ul,
          .blog-content ol {
            margin-top: 1.25rem;
            margin-bottom: 1.25rem;
            padding-left: 1.625rem;
          }
          
          .blog-content ul {
            list-style-type: disc;
          }
          
          .blog-content ol {
            list-style-type: decimal;
          }
          
          .blog-content li {
            margin-bottom: 0.5rem;
          }
          
          .blog-content blockquote {
            border-left: 4px solid #144793;
            padding-left: 1.5rem;
            margin: 1.5rem 0;
            font-style: italic;
            color: #6b7280;
          }
          
          .blog-content img {
            max-width: 100%;
            height: auto;
            margin: 2rem 0;
            border-radius: 0.375rem;
          }
          
          .blog-content a {
            color: #144793;
            text-decoration: underline;
            transition: color 0.2s;
          }
          
          .blog-content a:hover {
            color: #0f3a7a;
          }
          
          .blog-content code {
            background-color: #f3f4f6;
            padding: 0.125rem 0.375rem;
            border-radius: 0.25rem;
            font-family: 'Courier New', monospace;
            font-size: 0.875em;
            color: #1f2937;
          }
          
          .blog-content pre {
            background-color: #1f2937;
            color: #f9fafb;
            padding: 1rem;
            border-radius: 0.375rem;
            overflow-x: auto;
            margin: 1.5rem 0;
          }
          
          .blog-content pre code {
            background-color: transparent;
            color: inherit;
            padding: 0;
          }
          
          .blog-content hr {
            border: none;
            border-top: 2px solid #e5e7eb;
            margin: 2rem 0;
          }
          
          @media (max-width: 768px) {
            .blog-content h1 {
              font-size: 2rem;
            }
            
            .blog-content h2 {
              font-size: 1.75rem;
            }
            
            .blog-content h3 {
              font-size: 1.375rem;
            }
          }
        `}</style>

        {/* Date */}
        <div className="mt-8 pt-8 border-t flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-2" />
          {t('published')}: {new Date(post.createdAt).toLocaleDateString('tr-TR', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </article>
    </main>
  );
}
