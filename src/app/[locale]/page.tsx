import { getAllPosts, getAllCategories } from '@/lib/posts';
import { Locale } from '@/i18n/request';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export const dynamic = 'force-static';

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
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.2),transparent_50%)]"></div>
        
        <div className="relative container mx-auto px-6 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent leading-tight">
              {locale === 'ko' ? 'AI 비용 최적화 가이드' : 'AI Cost Optimization Guide'}
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 mb-12 leading-relaxed font-light">
              {locale === 'ko' 
                ? 'ChatGPT Plus 대신 종량제로 더 저렴하게 AI를 사용하는 방법을 알아보세요'
                : 'Learn how to use AI more cost-effectively with pay-per-use instead of ChatGPT Plus'
              }
            </p>
            <Link 
              href="https://payperchat.org" 
              target="_blank"
              className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {locale === 'ko' ? 'PayPerChat 시작하기' : 'Get Started with PayPerChat'}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            {locale === 'ko' ? '카테고리' : 'Categories'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/${locale}/categories/${encodeURIComponent(category)}`}
                className="group relative bg-gray-800 border border-gray-700 p-6 rounded-xl hover:border-blue-500 transition-all duration-300 text-center hover:bg-gray-750"
              >
                <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">{category}</h3>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300"></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            {locale === 'ko' ? '최근 포스트' : 'Recent Posts'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Link 
                key={post.slug}
                href={`/${locale}/posts/${post.slug}`}
                className="group block"
              >
                <article className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 transform hover:scale-[1.02]">
                  {post.image && (
                    <div className="relative overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.categories.map((category) => (
                        <span 
                          key={category}
                          className="bg-blue-500/10 text-blue-400 text-xs px-3 py-1 rounded-full border border-blue-500/20"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 mb-6 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{new Date(post.date).toLocaleDateString(locale === 'ko' ? 'ko-KR' : 'en-US')}</span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {post.readingTime}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
          
          {posts.length > 6 && (
            <div className="text-center mt-16">
              <Link 
                href={`/${locale}/posts`}
                className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {locale === 'ko' ? '모든 포스트 보기' : 'View All Posts'}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* PayPerChat Promotion Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        
        <div className="relative container mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-white">
            {locale === 'ko' ? '왜 PayPerChat을 선택해야 할까요?' : 'Why Choose PayPerChat?'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-2xl hover:border-blue-500/50 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">
                {locale === 'ko' ? '비용 절약' : 'Cost Savings'}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {locale === 'ko' 
                  ? '월 구독료 대신 사용한 만큼만 지불하여 최대 70% 절약'
                  : 'Save up to 70% by paying only for what you use instead of monthly subscriptions'
                }
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-2xl hover:border-blue-500/50 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">
                {locale === 'ko' ? '다양한 모델' : 'Multiple Models'}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {locale === 'ko' 
                  ? 'ChatGPT, Claude, Gemini 등 모든 AI 모델을 한 곳에서'
                  : 'Access ChatGPT, Claude, Gemini, and all AI models in one place'
                }
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-2xl hover:border-blue-500/50 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">
                {locale === 'ko' ? '즉시 시작' : 'Instant Start'}
              </h3>
              <p className="text-gray-300 leading-relaxed">
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
            className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg font-semibold rounded-2xl transition-all duration-200 shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105"
          >
            {locale === 'ko' ? 'PayPerChat 무료 체험하기' : 'Try PayPerChat for Free'}
            <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}