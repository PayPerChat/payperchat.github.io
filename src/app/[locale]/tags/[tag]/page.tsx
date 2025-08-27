import { getPostsByTag, getAllTagSlugs, getTagBySlug, getTagSlug, getCategorySlug } from '@/lib/posts';
import { getTagDisplayName, getCategoryDisplayName } from '@/lib/mappings';
import { generateTagMetadata, toNextjsMetadata } from '@/lib/metadata';
import { formatDate } from '@/lib/dateUtils';
import { Locale } from '@/i18n/request';
import { routing } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-static';

interface TagPageProps {
  params: Promise<{ 
    locale: Locale;
    tag: string;
  }>;
}

export async function generateStaticParams() {
  const paths = [];
  
  for (const locale of routing.locales) {
    const tagData = getAllTagSlugs(locale);
    for (const { slug } of tagData) {
      paths.push({
        locale,
        tag: slug,
      });
    }
  }
  
  return paths;
}

export async function generateMetadata({ params }: TagPageProps) {
  const { locale, tag } = await params;
  const posts = getPostsByTag(tag, locale);
  const metadataConfig = generateTagMetadata(tag, locale, posts.length);
  
  return toNextjsMetadata(metadataConfig);
}

export default async function TagPage({ params }: TagPageProps) {
  const { locale, tag } = await params;
  const tagDisplayName = getTagDisplayName(tag, locale);
  const posts = getPostsByTag(tag, locale);
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
          <Link href={`/${locale}/tags`} className="hover:text-blue-600">
            {t('navigation.tags')}
          </Link>
          <span className="mx-2">/</span>
          <span>#{tagDisplayName}</span>
        </nav>
        
        <h1 className="text-4xl font-bold mb-4">#{tagDisplayName}</h1>
        <p className="text-gray-600">
          {t('pages.tag.postsAvailable', { count: posts.length })}
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
                  {post.categories.map((categorySlug) => (
                    <Link
                      key={categorySlug}
                      href={`/${locale}/categories/${categorySlug}`}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                    >
                      {getCategoryDisplayName(categorySlug, locale)}
                    </Link>
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
                
                <div className="flex flex-wrap gap-1 mt-3">
                  {post.tags.map((postTagSlug) => (
                    <Link
                      key={postTagSlug}
                      href={`/${locale}/tags/${postTagSlug}`}
                      className={`text-xs px-2 py-1 rounded transition-colors ${
                        postTagSlug === tag 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      #{getTagDisplayName(postTagSlug, locale)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Back to tags */}
      <div className="mt-16 pt-8 border-t border-gray-200 text-center">
        <Link 
          href={`/${locale}/tags`}
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          ← {t('actions.viewAllTags')}
        </Link>
      </div>
    </div>
  );
}