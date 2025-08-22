import { getAllPosts, getAllCategories, getAllTags } from '@/lib/posts';
import { Locale } from '@/i18n/request';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

interface PostsPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PostsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  
  return {
    title: t('posts.title'),
    description: t('posts.description'),
  };
}

export default async function PostsPage({ params }: PostsPageProps) {
  const { locale } = await params;
  const posts = getAllPosts(locale);
  const categories = getAllCategories(locale);
  const tags = getAllTags(locale);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">
        {locale === 'ko' ? '모든 포스트' : 'All Posts'}
      </h1>

      {/* Filter Sidebar */}
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-1/4">
          {/* Categories */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">
              {locale === 'ko' ? '카테고리' : 'Categories'}
            </h2>
            <div className="space-y-2">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/${locale}/categories/${encodeURIComponent(category)}`}
                  className="block text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <h2 className="text-xl font-bold mb-4">
              {locale === 'ko' ? '태그' : 'Tags'}
            </h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/${locale}/tags/${encodeURIComponent(tag)}`}
                  className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* Posts Grid */}
        <main className="lg:w-3/4">
          <div className="grid md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <article key={post.slug} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {post.image && (
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.categories.map((category) => (
                      <span 
                        key={category}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl font-bold mb-3">
                    <Link 
                      href={`/${locale}/posts/${post.slug}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{new Date(post.date).toLocaleDateString(locale === 'ko' ? 'ko-KR' : 'en-US')}</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span 
                        key={tag}
                        className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="text-gray-400 text-xs">
                        +{post.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {locale === 'ko' ? '포스트가 없습니다.' : 'No posts found.'}
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}