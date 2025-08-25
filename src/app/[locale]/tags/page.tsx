import { getAllTags, getPostsByTag } from '@/lib/posts';
import { Locale } from '@/i18n/request';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export const dynamic = 'force-static';

interface TagsPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: TagsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  
  return {
    title: t('tags.title'),
    description: t('tags.description'),
  };
}

export default async function TagsPage({ params }: TagsPageProps) {
  const { locale } = await params;
  const tags = getAllTags(locale);

  return (
    <div className="container mx-auto py-16 lg:py-20">
      <header className="mb-20 text-center">
        <h1 className="text-5xl font-bold mb-6 text-gray-900">
          {locale === 'ko' ? '태그' : 'Tags'}
        </h1>
        <p className="text-gray-600 text-xl max-w-2xl mx-auto">
          {locale === 'ko' 
            ? '태그별로 관련 글을 찾아보세요'
            : 'Find related articles by tags'
          }
        </p>
      </header>

      <div className="flex flex-wrap gap-4 justify-center max-w-4xl mx-auto">
        {tags.map((tag) => {
          const posts = getPostsByTag(tag, locale);
          
          return (
            <Link
              key={tag}
              href={`/${locale}/tags/${encodeURIComponent(tag)}`}
              className="group card hover:shadow-lg transition-all duration-300 flex items-center gap-3 px-6 py-4 min-w-fit"
            >
              <span className="text-gray-700 group-hover:text-blue-600 transition-colors font-medium text-lg">
                #{tag}
              </span>
              <span className="bg-gray-100 group-hover:bg-blue-100 text-gray-600 group-hover:text-blue-800 text-sm px-3 py-1 rounded-full font-medium transition-all duration-300">
                {posts.length}
              </span>
            </Link>
          );
        })}
      </div>

      {tags.length === 0 && (
        <div className="text-center py-16">
          <div className="bg-gray-50 rounded-2xl p-12 max-w-md mx-auto">
            <div className="text-gray-400 text-6xl mb-4">📄</div>
            <p className="text-gray-500 text-lg font-medium">
              {locale === 'ko' ? '태그가 없습니다.' : 'No tags found.'}
            </p>
          </div>
        </div>
      )}

      <div className="mt-20 pt-12 border-t border-gray-200 text-center">
        <Link 
          href={`/${locale}/posts`}
          className="btn btn-secondary inline-flex items-center gap-2"
        >
          {locale === 'ko' ? '모든 포스트 보기' : 'View All Posts'}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}