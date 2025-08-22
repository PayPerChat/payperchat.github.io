import { getAllPosts, getAllCategories } from '@/lib/posts';
import { Locale } from '@/i18n/request';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations('metadata.home');
  
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://payperchat.github.io/${locale}`,
      siteName: 'PayPerChat Blog',
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      type: 'website',
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const posts = getAllPosts(locale);
  const recentPosts = posts.slice(0, 6);
  const categories = getAllCategories(locale);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            {locale === 'ko' ? 'AI 비용 최적화 가이드' : 'AI Cost Optimization Guide'}
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {locale === 'ko' 
              ? 'ChatGPT Plus 대신 종량제로 더 저렴하게 AI를 사용하는 방법을 알아보세요'
              : 'Learn how to use AI more cost-effectively with pay-per-use instead of ChatGPT Plus'
            }
          </p>
          <Link 
            href="https://payperchat.org" 
            target="_blank"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            {locale === 'ko' ? 'PayPerChat 시작하기' : 'Get Started with PayPerChat'}
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {locale === 'ko' ? '카테고리' : 'Categories'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/${locale}/categories/${encodeURIComponent(category)}`}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <h3 className="font-semibold text-gray-900">{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {locale === 'ko' ? '최근 포스트' : 'Recent Posts'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
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
                  <h3 className="text-xl font-bold mb-3 line-clamp-2">
                    <Link 
                      href={`/${locale}/posts/${post.slug}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{new Date(post.date).toLocaleDateString(locale === 'ko' ? 'ko-KR' : 'en-US')}</span>
                    <span>{post.readingTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          {posts.length > 6 && (
            <div className="text-center mt-12">
              <Link 
                href={`/${locale}/posts`}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {locale === 'ko' ? '모든 포스트 보기' : 'View All Posts'}
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* PayPerChat Promotion Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            {locale === 'ko' ? '왜 PayPerChat을 선택해야 할까요?' : 'Why Choose PayPerChat?'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">
                {locale === 'ko' ? '💰 비용 절약' : '💰 Cost Savings'}
              </h3>
              <p className="text-gray-600">
                {locale === 'ko' 
                  ? '월 구독료 대신 사용한 만큼만 지불하여 최대 70% 절약'
                  : 'Save up to 70% by paying only for what you use instead of monthly subscriptions'
                }
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">
                {locale === 'ko' ? '🔀 다양한 모델' : '🔀 Multiple Models'}
              </h3>
              <p className="text-gray-600">
                {locale === 'ko' 
                  ? 'ChatGPT, Claude, Gemini 등 모든 AI 모델을 한 곳에서'
                  : 'Access ChatGPT, Claude, Gemini, and all AI models in one place'
                }
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">
                {locale === 'ko' ? '⚡ 즉시 시작' : '⚡ Instant Start'}
              </h3>
              <p className="text-gray-600">
                {locale === 'ko' 
                  ? '복잡한 가입 절차 없이 바로 사용 시작'
                  : 'Start using immediately without complex registration processes'
                }
              </p>
            </div>
          </div>
          <Link 
            href="https://payperchat.org" 
            target="_blank"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            {locale === 'ko' ? 'PayPerChat 무료 체험하기' : 'Try PayPerChat for Free'}
          </Link>
        </div>
      </section>
    </div>
  );
}