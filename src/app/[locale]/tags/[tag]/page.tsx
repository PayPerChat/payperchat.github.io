import { getPostsByTag, getAllTags } from '@/lib/posts';
import { Locale } from '@/i18n/request';
import { routing } from '@/i18n/routing';
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
    const tags = getAllTags(locale);
    for (const tag of tags) {
      paths.push({
        locale,
        tag: encodeURIComponent(tag),
      });
    }
  }
  
  return paths;
}

export async function generateMetadata({ params }: TagPageProps) {
  const { locale, tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  
  return {
    title: `#${decodedTag} - PayPerChat Blog`,
    description: `${decodedTag} 태그가 포함된 모든 글을 확인하세요`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { locale, tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag, locale);
  
  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <header className="mb-8">
        <nav className="text-sm text-gray-500 mb-4">
          <Link href={`/${locale}`} className="hover:text-blue-600">
            {locale === 'ko' ? '홈' : 'Home'}
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/${locale}/tags`} className="hover:text-blue-600">
            {locale === 'ko' ? '태그' : 'Tags'}
          </Link>
          <span className="mx-2">/</span>
          <span>#{decodedTag}</span>
        </nav>
        
        <h1 className="text-4xl font-bold mb-4">#{decodedTag}</h1>
        <p className="text-gray-600">
          {locale === 'ko' 
            ? `이 태그가 포함된 ${posts.length}개의 글이 있습니다.`
            : `${posts.length} post${posts.length !== 1 ? 's' : ''} tagged with this.`
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
                  {post.categories.map((category) => (
                    <Link
                      key={category}
                      href={`/${locale}/categories/${encodeURIComponent(category)}`}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                    >
                      {category}
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
                
                <div className="flex flex-wrap gap-1 mt-3">
                  {post.tags.map((tagName) => (
                    <Link
                      key={tagName}
                      href={`/${locale}/tags/${encodeURIComponent(tagName)}`}
                      className={`text-xs px-2 py-1 rounded transition-colors ${
                        tagName === decodedTag 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      #{tagName}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Back to tags */}
      <div className="mt-12 text-center">
        <Link 
          href={`/${locale}/tags`}
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          ← {locale === 'ko' ? '모든 태그 보기' : 'View All Tags'}
        </Link>
      </div>
    </div>
  );
}