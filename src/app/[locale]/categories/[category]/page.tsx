import { getPostsByCategory, getAllCategorySlugs, getCategoryBySlug, getTagSlug } from '@/lib/posts';
import { getCategoryDisplayName, getTagDisplayName } from '@/lib/mappings';
import { generateCategoryMetadata, toNextjsMetadata } from '@/lib/metadata';
import { formatDate } from '@/lib/dateUtils';
import { Locale } from '@/i18n/request';
import { routing } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-static';

interface CategoryPageProps {
  params: Promise<{ 
    locale: Locale;
    category: string;
  }>;
}

export async function generateStaticParams() {
  const paths = [];
  
  for (const locale of routing.locales) {
    const categoryData = getAllCategorySlugs(locale);
    for (const { slug } of categoryData) {
      paths.push({
        locale,
        category: slug,
      });
    }
  }
  
  return paths;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { locale, category } = await params;
  const posts = getPostsByCategory(category, locale);
  const metadataConfig = generateCategoryMetadata(category, locale, posts.length);
  
  return toNextjsMetadata(metadataConfig);
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { locale, category } = await params;
  const categoryDisplayName = getCategoryDisplayName(category, locale);
  const posts = getPostsByCategory(category, locale);
  const t = await getTranslations();
  
  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 lg:py-20">
      <header className="mb-12">
        <nav className="text-sm text-gray-500 mb-4">
          <Link href={`/${locale}`} className="hover:text-blue-600">
            {t('navigation.home')}
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/${locale}/categories`} className="hover:text-blue-600">
            {t('navigation.categories')}
          </Link>
          <span className="mx-2">/</span>
          <span>{categoryDisplayName}</span>
        </nav>
        
        <h1 className="text-4xl font-bold mb-4">{categoryDisplayName}</h1>
        <p className="text-gray-600">
          {t('pages.categories.postsFound', { count: posts.length })}
        </p>
      </header>

      <div className="space-y-12">
        {posts.map((post) => (
          <article key={post.slug} className="border-b border-gray-200 pb-12 last:border-b-0 last:pb-0">
            <div className="flex flex-col md:flex-row gap-6">
              {post.image && (
                <div className="md:w-1/3">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
              <div className={post.image ? 'md:w-2/3' : 'w-full'}>
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.categories.map((catSlug) => (
                    <span 
                      key={catSlug}
                      className={`text-xs px-2 py-1 rounded ${
                        catSlug === category 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {getCategoryDisplayName(catSlug, locale)}
                    </span>
                  ))}
                </div>
                
                <h2 className="text-2xl font-bold mb-3">
                  <Link 
                    href={`/${locale}/posts/${post.slug}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span>{formatDate(post.date, locale)}</span>
                  <span>•</span>
                  <span>{post.readingTime}</span>
                  {post.author && (
                    <>
                      <span>•</span>
                      <span>{post.author}</span>
                    </>
                  )}
                </div>
                
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {post.tags.slice(0, 4).map((tagSlug) => (
                      <Link
                        key={tagSlug}
                        href={`/${locale}/tags/${tagSlug}`}
                        className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                      >
                        #{getTagDisplayName(tagSlug, locale)}
                      </Link>
                    ))}
                    {post.tags.length > 4 && (
                      <span className="text-gray-400 text-xs self-center">
                        +{post.tags.length - 4}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Back to categories */}
      <div className="mt-16 pt-8 border-t border-gray-200 text-center">
        <Link 
          href={`/${locale}/categories`}
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          ← {t('actions.viewAllCategories')}
        </Link>
      </div>
    </div>
  );
}