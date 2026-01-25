'use client';

import { useTranslations } from '@/components/I18nProvider';
import Link from 'next/link';
import { Calendar, ArrowLeft } from 'lucide-react';
import { type Locale } from '@/lib/i18n';
import { getRoute } from '@/lib/routes';
import Image from 'next/image';
import type { Blog, AboutSection } from '@/lib/types';
import { AuthorCard } from '@/components/AuthorCard';

interface BlogPostProps {
  post: Blog;
  locale: Locale;
  author: AboutSection | null;
}

export function BlogPost({ post, locale, author }: BlogPostProps) {
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
          />
        </div>

        {/* Author Card */}
        <AuthorCard author={author} locale={locale} />

        {/* Blog Content Styles - Match Editor Styles */}
        <style jsx global>{`
          .blog-content h2 {
            font-size: 1.5em;
            font-weight: 600;
            margin-bottom: 0.5em;
            margin-top: 1em;
          }
          
          .blog-content h3 {
            font-size: 1.25em;
            font-weight: 600;
            margin-bottom: 0.5em;
            margin-top: 1em;
          }
          
          .blog-content p {
            margin-bottom: 0.5em;
            line-height: 1.6;
          }
          
          .blog-content ul,
          .blog-content ol {
            padding-left: 1.5em;
            margin-bottom: 1em;
          }
          
          .blog-content ul {
            list-style-type: disc;
          }
          
          .blog-content ol {
            list-style-type: decimal;
          }
          
          .blog-content blockquote {
            border-left: 3px solid #144793;
            padding-left: 1em;
            margin-left: 0;
            font-style: italic;
            color: #666;
            margin-bottom: 1em;
          }
          
          .blog-content hr {
            border: none;
            border-top: 2px solid #e5e7eb;
            margin: 1.5em 0;
          }
          
          .blog-content code {
            background-color: #f3f4f6;
            padding: 0.2em 0.4em;
            border-radius: 3px;
            font-family: monospace;
          }
          
          .blog-content img {
            max-width: 100%;
            height: auto;
            margin: 1em 0;
          }
          
          .blog-content a {
            color: #144793;
            text-decoration: underline;
          }
          
          .blog-content a:hover {
            color: #0f3a7a;
          }
          
          .blog-content em {
            font-style: italic;
          }
          
          .blog-content strong {
            font-weight: 600;
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
