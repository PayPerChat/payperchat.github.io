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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30"></div>
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] opacity-20"></div>
        
        <div className="relative">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
            <div className="mx-auto max-w-4xl text-center">
              {/* Badge */}
              <div className="mb-8 inline-flex">
                <div className="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.236 4.53L8.343 10.75a.75.75 0 00-1.086 1.032L8.343 13l.707.707 1.25-1.25 3.236-4.53a.75.75 0 00.321-.726z" clipRule="evenodd" />
                  </svg>
                  {locale === 'ko' ? '월 70% 비용 절약 가능' : 'Save 70% monthly costs'}
                </div>
              </div>

              {/* Main heading */}
              <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
                <span className="block">
                  {locale === 'ko' ? 'AI 비용을' : 'Optimize your'}
                </span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  {locale === 'ko' ? '최적화하세요' : 'AI costs'}
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-gray-600 sm:text-xl">
                {locale === 'ko' 
                  ? '월 구독료 대신 사용한 만큼만 지불하는 PayPerChat으로 ChatGPT Plus보다 똑똑하게 AI를 활용하세요'
                  : 'Smart AI usage with PayPerChat\'s pay-per-use model. No more expensive monthly subscriptions like ChatGPT Plus'
                }
              </p>

              {/* CTA Buttons */}
              <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link 
                  href="https://payperchat.org" 
                  target="_blank"
                  className="group relative inline-flex items-center justify-center rounded-full bg-gray-900 px-8 py-3.5 text-sm font-semibold text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-200"
                >
                  {locale === 'ko' ? '무료로 시작하기' : 'Get started for free'}
                  <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                
                <Link 
                  href={`/${locale}/posts/chatgpt-plus-alternative-pay-per-use`}
                  className="group inline-flex items-center justify-center rounded-full border border-gray-300 px-8 py-3.5 text-sm font-semibold text-gray-900 hover:border-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-200"
                >
                  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  {locale === 'ko' ? '가이드 보기' : 'Watch guide'}
                </Link>
              </div>

              {/* Social proof */}
              <div className="mt-16">
                <p className="text-sm font-medium text-gray-500">
                  {locale === 'ko' ? '이미 수천 명이 비용을 절약하고 있습니다' : 'Thousands already saving costs'}
                </p>
                <div className="mt-6 flex items-center justify-center space-x-8 opacity-60">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <div className="flex -space-x-2">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 to-rose-500"></div>
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-violet-500"></div>
                    </div>
                    <span className="ml-2 font-medium">5000+</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="font-semibold text-green-600">98%</span> {locale === 'ko' ? '만족도' : 'satisfaction'}
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="font-semibold text-blue-600">70%</span> {locale === 'ko' ? '비용 절약' : 'cost savings'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {locale === 'ko' ? '주제별 탐색' : 'Explore by topic'}
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              {locale === 'ko' 
                ? '관심 있는 주제를 선택해서 관련 글들을 찾아보세요'
                : 'Discover articles organized by topics that matter to you'
              }
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/${locale}/categories/${encodeURIComponent(category)}`}
                className="group relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-white px-8 pb-8 pt-80 sm:pt-48 lg:pt-80 hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-xl border border-gray-100"
              >
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900/80 via-gray-900/40" />
                <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                <div className="absolute inset-0 -z-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />
                
                <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-white/70">
                  <div className="mr-8 flex items-center gap-x-4">
                    <div className="flex items-center gap-x-1">
                      <div className="h-1 w-1 rounded-full bg-white/40" />
                      <div className="h-1 w-1 rounded-full bg-white/60" />
                      <div className="h-1 w-1 rounded-full bg-white/80" />
                    </div>
                  </div>
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-6 text-white group-hover:text-blue-200 transition-colors">
                  {category}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {locale === 'ko' ? '최신 인사이트' : 'Latest insights'}
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              {locale === 'ko' 
                ? 'AI 비용 최적화와 활용법에 대한 최신 정보를 확인해보세요'
                : 'Stay updated with the latest AI cost optimization strategies and tips'
              }
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {recentPosts.map((post) => (
              <Link 
                key={post.slug}
                href={`/${locale}/posts/${post.slug}`}
                className="group"
              >
                <article className="flex flex-col items-start">
                  {post.image && (
                    <div className="relative w-full">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2] group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  )}
                  <div className="max-w-xl">
                    <div className="mt-8 flex items-center gap-x-4 text-xs">
                      <time className="text-gray-500">
                        {new Date(post.date).toLocaleDateString(locale === 'ko' ? 'ko-KR' : 'en-US')}
                      </time>
                      <div className="flex flex-wrap gap-1">
                        {post.categories.map((category) => (
                          <span 
                            key={category}
                            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="group relative">
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-blue-600">
                        {post.title}
                      </h3>
                      <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="relative mt-8 flex items-center gap-x-4">
                      <div className="text-sm leading-6">
                        <div className="flex items-center gap-x-2 text-gray-500">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="font-semibold">{post.readingTime}</span>
                        </div>
                        {post.author && (
                          <p className="text-gray-600 mt-1">By {post.author}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
          
          {posts.length > 6 && (
            <div className="mx-auto mt-16 max-w-2xl text-center lg:mx-0 lg:max-w-none">
              <Link 
                href={`/${locale}/posts`}
                className="inline-flex items-center justify-center rounded-full border border-gray-300 px-8 py-3 text-sm font-semibold text-gray-900 hover:border-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-200"
              >
                {locale === 'ko' ? '모든 글 보기' : 'View all articles'}
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* PayPerChat Promotion Section */}
      <section className="relative py-24 bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {locale === 'ko' ? '스마트한 AI 비용 관리' : 'Smart AI cost management'}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              {locale === 'ko' 
                ? 'PayPerChat으로 고정 구독료의 부담에서 벗어나세요'
                : 'Break free from expensive fixed subscriptions with PayPerChat'
              }
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-green-500">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <dt className="text-base font-semibold leading-7 text-white">
                  {locale === 'ko' ? '최대 70% 절약' : 'Up to 70% savings'}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">
                    {locale === 'ko' 
                      ? '사용량에 따른 합리적 요금제로 불필요한 비용을 줄이세요'
                      : 'Reduce unnecessary costs with usage-based fair pricing'
                    }
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <dt className="text-base font-semibold leading-7 text-white">
                  {locale === 'ko' ? '모든 AI 모델 지원' : 'All AI models supported'}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">
                    {locale === 'ko' 
                      ? 'GPT, Claude, Gemini 등 최신 AI 모델들을 한 곳에서 이용'
                      : 'Access the latest AI models like GPT, Claude, Gemini in one place'
                    }
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <dt className="text-base font-semibold leading-7 text-white">
                  {locale === 'ko' ? '즉시 시작 가능' : 'Get started instantly'}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">
                    {locale === 'ko' 
                      ? '복잡한 설정 없이 몇 초만에 AI 사용을 시작하세요'
                      : 'Start using AI in seconds without complex setup'
                    }
                  </p>
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-16 flex justify-center">
            <Link 
              href="https://payperchat.org" 
              target="_blank"
              className="group inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200"
            >
              {locale === 'ko' ? 'PayPerChat 무료 체험하기' : 'Try PayPerChat for free'}
              <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}