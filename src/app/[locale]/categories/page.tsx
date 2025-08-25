import { getAllCategories, getPostsByCategory } from '@/lib/posts';
import { Locale } from '@/i18n/request';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export const dynamic = 'force-static';

interface CategoriesPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: CategoriesPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  
  return {
    title: t('categories.title'),
    description: t('categories.description'),
  };
}

export default async function CategoriesPage({ params }: CategoriesPageProps) {
  const { locale } = await params;
  const categories = getAllCategories(locale);

  return (
    <div className="container mx-auto py-16 lg:py-20">
      <header className="mb-20 text-center">
        <h1 className="text-5xl font-bold mb-6 text-gray-900">
          {locale === 'ko' ? '카테고리' : 'Categories'}
        </h1>
        <p className="text-gray-600 text-xl max-w-2xl mx-auto">
          {locale === 'ko' 
            ? '관심 있는 주제별로 글을 찾아보세요'
            : 'Browse articles by topic of interest'
          }
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => {
          const posts = getPostsByCategory(category, locale);
          
          return (
            <Link
              key={category}
              href={`/${locale}/categories/${encodeURIComponent(category)}`}
              className="group card hover:shadow-xl transition-all duration-300 p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {category}
                </h2>
                <span className="bg-blue-100 group-hover:bg-blue-200 text-blue-800 text-sm px-3 py-1 rounded-full font-medium transition-all duration-300">
                  {posts.length}
                </span>
              </div>
              
              <p className="text-gray-600 text-base mb-6 font-medium">
                {locale === 'ko' 
                  ? `${posts.length}개의 글이 있습니다`
                  : `${posts.length} post${posts.length !== 1 ? 's' : ''} available`
                }
              </p>

              {posts.length > 0 && (
                <div className="space-y-3">
                  <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide">
                    {locale === 'ko' ? '최근 글' : 'Recent Posts'}
                  </p>
                  <div className="space-y-2">
                    {posts.slice(0, 2).map((post) => (
                      <p key={post.slug} className="text-sm text-gray-700 line-clamp-2 leading-relaxed">
                        • {post.title}
                      </p>
                    ))}
                    {posts.length > 2 && (
                      <p className="text-xs text-gray-500 font-medium pt-1">
                        +{posts.length - 2} {locale === 'ko' ? '더 보기' : 'more'}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-16">
          <div className="bg-gray-50 rounded-2xl p-12 max-w-md mx-auto">
            <div className="text-gray-400 text-6xl mb-4">📂</div>
            <p className="text-gray-500 text-lg font-medium">
              {locale === 'ko' ? '카테고리가 없습니다.' : 'No categories found.'}
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