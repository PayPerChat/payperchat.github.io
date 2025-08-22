import { getPostsByCategory, getAllCategories } from '@/lib/posts';
import { Locale } from '@/i18n/request';
import { routing } from '@/i18n/routing';
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
    const categories = getAllCategories(locale);
    for (const category of categories) {
      paths.push({
        locale,
        category: encodeURIComponent(category),
      });
    }
  }
  
  return paths;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { locale, category } = await params;
  const decodedCategory = decodeURIComponent(category);
  
  return {
    title: `${decodedCategory} - PayPerChat Blog`,
    description: `${decodedCategory} 카테고리의 모든 글을 확인하세요`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { locale, category } = await params;
  const decodedCategory = decodeURIComponent(category);
  const posts = getPostsByCategory(decodedCategory, locale);
  
  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <nav className="text-sm text-gray-500 mb-4">
          <Link href={`/${locale}`} className="hover:text-blue-600">
            {locale === 'ko' ? '홈' : 'Home'}
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/${locale}/categories`} className="hover:text-blue-600">
            {locale === 'ko' ? '카테고리' : 'Categories'}
          </Link>
          <span className="mx-2">/</span>
          <span>{decodedCategory}</span>
        </nav>
        
        <h1 className="text-4xl font-bold mb-4">{decodedCategory}</h1>
        <p className="text-gray-600">
          {locale === 'ko' 
            ? `${posts.length}개의 글이 있습니다.`
            : `${posts.length} post${posts.length !== 1 ? 's' : ''} found.`
          }
        </p>
      </header>

      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="border-b border-gray-200 pb-8 last:border-b-0">
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
                  {post.categories.map((cat) => (
                    <span 
                      key={cat}
                      className={`text-xs px-2 py-1 rounded ${
                        cat === decodedCategory 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {cat}
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
                  <span>{new Date(post.date).toLocaleDateString(locale === 'ko' ? 'ko-KR' : 'en-US')}</span>
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
                    {post.tags.slice(0, 4).map((tag) => (
                      <Link
                        key={tag}
                        href={`/${locale}/tags/${encodeURIComponent(tag)}`}
                        className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                      >
                        #{tag}
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
      <div className="mt-12 text-center">
        <Link 
          href={`/${locale}/categories`}
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          ← {locale === 'ko' ? '모든 카테고리 보기' : 'View All Categories'}
        </Link>
      </div>
    </div>
  );
}