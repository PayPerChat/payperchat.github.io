import { getAllPosts, getAllCategoryDisplayNames, getCategorySlug } from '@/lib/posts';
import { getCategoryDisplayName } from '@/lib/mappings';
import { generateBaseMetadata, toNextjsMetadata } from '@/lib/metadata';
import { formatDate } from '@/lib/dateUtils';
import { Locale } from '@/i18n/request';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export const dynamic = 'force-static';

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: HomePageProps) {
  const { locale } = await params;
  const metadataConfig = generateBaseMetadata(locale);
  
  return toNextjsMetadata({
    ...metadataConfig,
    title: locale === 'ko' 
      ? 'AI 비용 70% 절약하는 PayPerChat 블로그'
      : 'PayPerChat Blog - Save 70% on AI Costs',
    description: locale === 'ko'
      ? 'ChatGPT Plus 대신 종량제 AI 서비스로 월 70% 절약하세요. LLM 최적화와 비용 효율적인 AI 사용법을 알아보세요.'
      : 'Save 70% monthly by switching from ChatGPT Plus to pay-per-use AI services. Learn LLM optimization and cost-efficient AI usage.',
    openGraph: {
      ...metadataConfig.openGraph!,
      title: locale === 'ko'
        ? 'AI 비용 70% 절약하는 PayPerChat 블로그'
        : 'PayPerChat Blog - Save 70% on AI Costs',
      description: locale === 'ko'
        ? 'ChatGPT Plus 대신 종량제 AI로 월 70% 절약'
        : 'Save 70% monthly with pay-per-use AI instead of ChatGPT Plus'
    }
  });
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const posts = getAllPosts(locale);
  const recentPosts = posts.slice(0, 6);
  const categories = getAllCategoryDisplayNames(locale);
  const t = await getTranslations({ locale });

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
                  {t('pages.home.hero.badge')}
                </div>
              </div>

              {/* Main heading */}
              <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
                <span className="block">
                  {t('pages.home.hero.title1')}
                </span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  {t('pages.home.hero.title2')}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-gray-600 sm:text-xl">
                {t('pages.home.hero.description')}
              </p>

              {/* CTA Buttons */}
              <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="https://payperchat.org"
                  target="_blank"
                  className="group relative inline-flex items-center justify-center rounded-full bg-gray-900 px-8 py-3.5 text-sm font-semibold text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-200"
                >
                  {t('actions.getStarted')}
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
                  {t('actions.watchGuide')}
                </Link>
              </div>

              {/* Social proof */}
              <div className="mt-16">
                <p className="text-sm font-medium text-gray-500">
                  {t('pages.home.hero.trustBadge')}
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
                    <span className="font-semibold text-green-600">98%</span> {t('pages.home.hero.satisfaction')}
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="font-semibold text-blue-600">70%</span> {t('pages.home.hero.costSavings')}
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
              {t('pages.home.categories.title')}
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              {t('pages.home.categories.description')}
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {categories.map((category) => {
              // 카테고리별 아이콘과 설명 정의
              const getCategoryConfig = (slug: string, displayName: string, locale: Locale) => {
                const configs = {
                  'cost-optimization': {
                    icon: (
                      <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    ),
                    description: t('categoryDescriptions.cost-optimization'),
                    gradient: 'from-green-50 to-emerald-50',
                    borderColor: 'border-green-200'
                  },
                  'artificial-intelligence': {
                    icon: (
                      <svg className="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    ),
                    description: t('categoryDescriptions.artificial-intelligence'),
                    gradient: 'from-purple-50 to-violet-50',
                    borderColor: 'border-purple-200'
                  },
                  'tutorials': {
                    icon: (
                      <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    ),
                    description: t('categoryDescriptions.tutorials'),
                    gradient: 'from-blue-50 to-cyan-50',
                    borderColor: 'border-blue-200'
                  },
                  'productivity': {
                    icon: (
                      <svg className="h-8 w-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    ),
                    description: t('categoryDescriptions.productivity'),
                    gradient: 'from-orange-50 to-amber-50',
                    borderColor: 'border-orange-200'
                  },
                  'news': {
                    icon: (
                      <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
                      </svg>
                    ),
                    description: t('categoryDescriptions.news'),
                    gradient: 'from-red-50 to-pink-50',
                    borderColor: 'border-red-200'
                  },
                  'comparison': {
                    icon: (
                      <svg className="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    ),
                    description: t('categoryDescriptions.reviews'),
                    gradient: 'from-indigo-50 to-blue-50',
                    borderColor: 'border-indigo-200'
                  }
                };

                // 기본 설정 (존재하지 않는 카테고리용)
                return configs[slug as keyof typeof configs] || {
                  icon: (
                    <svg className="h-8 w-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  ),
                  description: t('categoryDescriptions.general'),
                  gradient: 'from-gray-50 to-slate-50',
                  borderColor: 'border-gray-200'
                };
              };

              const config = getCategoryConfig(category.slug, category.displayName, locale);

              return (
                <Link
                  key={category.slug}
                  href={`/${locale}/categories/${category.slug}`}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br ${config.gradient} p-8 hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-xl border ${config.borderColor} min-h-[200px]`}
                >
                  {/* 배경 패턴 */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent" />
                  </div>

                  {/* 아이콘 영역 */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-white/80 shadow-sm group-hover:bg-white transition-colors duration-300">
                      {config.icon}
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 rounded-full bg-gray-300/50"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-300/70"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-300/90"></div>
                    </div>
                  </div>

                  {/* 콘텐츠 영역 */}
                  <div className="relative z-10 mt-8">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300 mb-3">
                      {category.displayName}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {config.description}
                    </p>

                    {/* 화살표 아이콘 */}
                    <div className="mt-4 flex items-center text-gray-500 group-hover:text-blue-600 transition-colors duration-300">
                      <span className="text-sm font-medium">
                        {t('actions.exploreMore')}
                      </span>
                      <svg className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('pages.home.insights.title')}
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              {t('pages.home.insights.description')}
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
                        {formatDate(post.date, locale)}
                      </time>
                      <div className="flex flex-wrap gap-1">
                        {post.categories.map((categorySlug) => (
                          <span
                            key={categorySlug}
                            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                          >
                            {getCategoryDisplayName(categorySlug, locale)}
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
                          <p className="text-gray-600 mt-1">{t('post.by')} {post.author}</p>
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
                {t('pages.home.insights.viewAllButton')}
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
              {t('pages.home.promotion.title')}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              {t('pages.home.promotion.description')}
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
                  {t('pages.home.promotion.features.savings.title')}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">
                    {t('pages.home.promotion.features.savings.description')}
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
                  {t('pages.home.promotion.features.models.title')}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">
                    {t('pages.home.promotion.features.models.description')}
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
                  {t('pages.home.promotion.features.instant.title')}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">
                    {t('pages.home.promotion.features.instant.description')}
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
              {t('pages.home.promotion.ctaButton')}
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