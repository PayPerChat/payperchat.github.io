import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { Locale } from '@/i18n/request';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';

interface PostPageProps {
  params: Promise<{ 
    locale: Locale;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const paths = [];
  
  for (const locale of routing.locales) {
    const posts = getAllPosts(locale);
    for (const post of posts) {
      paths.push({
        locale,
        slug: post.slug,
      });
    }
  }
  
  return paths;
}

export async function generateMetadata({ params }: PostPageProps) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://payperchat.github.io/${locale}/posts/${slug}`,
      siteName: 'PayPerChat Blog',
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      type: 'article',
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
      images: post.image ? [{
        url: post.image,
        alt: post.title,
      }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);
  
  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts(locale);
  const currentIndex = allPosts.findIndex(p => p.slug === slug);
  const previousPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return (
    <>
      <JsonLd post={post} locale={locale} />
      <article className="container mx-auto py-8">
      {/* Header */}
      <header className="mb-12">
        <div className="flex flex-wrap gap-3 mb-6">
          {post.categories.map((category) => (
            <Link
              key={category}
              href={`/${locale}/categories/${encodeURIComponent(category)}`}
              className="bg-blue-100 text-blue-800 text-sm px-4 py-2 rounded-full hover:bg-blue-200 transition-all duration-200 font-medium"
            >
              {category}
            </Link>
          ))}
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">{post.title}</h1>
        
        <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
          <time dateTime={post.date} className="font-medium">
            {new Date(post.date).toLocaleDateString(locale === 'ko' ? 'ko-KR' : 'en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          <span className="text-gray-400">•</span>
          <span className="font-medium">{post.readingTime}</span>
          {post.author && (
            <>
              <span className="text-gray-400">•</span>
              <span className="font-medium">{post.author}</span>
            </>
          )}
        </div>

        {post.image && (
          <div className="mb-10">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
            />
          </div>
        )}

        {post.excerpt && (
          <div className="card p-8 mb-10 bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500">
            <p className="text-xl text-gray-700 leading-relaxed font-medium">
              {post.excerpt}
            </p>
          </div>
        )}
      </header>

      {/* Content */}
      <div className="prose prose-xl max-w-none mb-16">
        <MDXRemote source={post.content} />
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6 text-gray-900">
            {locale === 'ko' ? '태그' : 'Tags'}
          </h3>
          <div className="flex flex-wrap gap-3">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/${locale}/tags/${encodeURIComponent(tag)}`}
                className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-full hover:bg-gray-200 hover:text-gray-900 transition-all duration-200 font-medium"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* PayPerChat Promotion */}
      <div className="card p-10 mb-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-2 border-blue-100">
        <div className="text-center">
          <div className="text-4xl mb-4">💡</div>
          <h3 className="text-3xl font-bold mb-6 text-gray-900">
            {locale === 'ko' ? '더 저렴하게 AI 사용하기' : 'Use AI More Affordably'}
          </h3>
          <p className="text-gray-700 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
            {locale === 'ko' 
              ? '이 글이 도움이 되었다면, PayPerChat으로 월 구독료 없이 AI를 사용해보세요!'
              : 'If this article was helpful, try using AI without monthly subscriptions with PayPerChat!'
            }
          </p>
          <Link 
            href="https://payperchat.org" 
            target="_blank"
            className="btn btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {locale === 'ko' ? 'PayPerChat 무료 체험' : 'Try PayPerChat Free'}
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <nav className="grid md:grid-cols-3 gap-6 pt-12 border-t border-gray-200">
        {previousPost ? (
          <Link 
            href={`/${locale}/posts/${previousPost.slug}`}
            className="group card p-6 hover:shadow-lg transition-all duration-300"
          >
            <p className="text-sm text-gray-500 mb-2 font-medium">
              {locale === 'ko' ? '이전 글' : 'Previous Post'}
            </p>
            <p className="text-blue-600 group-hover:text-blue-700 transition-colors font-semibold leading-snug">
              ← {previousPost.title}
            </p>
          </Link>
        ) : (
          <div></div>
        )}
        
        <div className="flex justify-center">
          <Link 
            href={`/${locale}`}
            className="btn btn-secondary"
          >
            {locale === 'ko' ? '홈으로' : 'Back to Home'}
          </Link>
        </div>

        {nextPost ? (
          <Link 
            href={`/${locale}/posts/${nextPost.slug}`}
            className="group card p-6 hover:shadow-lg transition-all duration-300 text-right"
          >
            <p className="text-sm text-gray-500 mb-2 font-medium">
              {locale === 'ko' ? '다음 글' : 'Next Post'}
            </p>
            <p className="text-blue-600 group-hover:text-blue-700 transition-colors font-semibold leading-snug">
              {nextPost.title} →
            </p>
          </Link>
        ) : (
          <div></div>
        )}
      </nav>
      </article>
    </>
  );
}