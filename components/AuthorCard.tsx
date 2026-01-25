import Image from 'next/image';
import type { AboutSection } from '@/lib/types';
import Link from 'next/link';

interface AuthorCardProps {
    author: AboutSection | null;
    locale?: string;
}

export function AuthorCard({ author, locale = 'tr' }: AuthorCardProps) {
    if (!author) return null;

    return (
        <div className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-100 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Author Image */}
            {author.image && (
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-full overflow-hidden border-4 border-white shadow-sm">
                    <Image
                        src={author.image}
                        alt={author.title}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </div>
            )}

            {/* Author Info */}
            <div className="text-center sm:text-left flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {author.title}
                </h3>
                {author.subtitle && (
                    <p className="text-[#144793] font-medium text-sm mb-3">
                        {author.subtitle}
                    </p>
                )}

                <Link
                    href={`/${locale}/hakkimda`}
                    className="inline-flex items-center text-sm font-medium text-[#144793] hover:text-[#0f3a7a] transition-colors"
                >
                    Detaylı Bilgi
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}
