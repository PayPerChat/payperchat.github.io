import { Locale } from '@/i18n/request';
import { PostData } from './posts';
import { getCategoryDisplayName, getTagDisplayName } from './mappings';

export interface MetadataConfig {
  title: string;
  description: string;
  keywords?: string[];
  openGraph?: {
    title: string;
    description: string;
    type: 'website' | 'article';
    images?: string[];
    locale: string;
    siteName: string;
  };
  alternates?: {
    canonical: string;
    languages: Record<string, string>;
  };
  robots?: {
    index: boolean;
    follow: boolean;
  };
}

const BASE_URL = 'https://payperchat.github.io';
const SITE_NAME = 'PayPerChat Blog';

export function generateBaseMetadata(locale: Locale, path: string = ''): MetadataConfig {
  const url = `${BASE_URL}/${locale}${path}`;
  const alternateUrl = locale === 'ko' ? `${BASE_URL}/en${path}` : `${BASE_URL}/ko${path}`;
  
  return {
    title: locale === 'ko' ? 'PayPerChat 블로그' : 'PayPerChat Blog', // 기본 제목
    description: locale === 'ko' 
      ? 'AI 비용 최적화와 LLM 사용법 가이드 - 종량제 AI 서비스로 70% 절약하세요'
      : 'AI Cost Optimization and LLM Usage Guides - Save 70% with Pay-Per-Use AI Services',
    keywords: locale === 'ko'
      ? ['AI 비용절약', 'ChatGPT 대안', '종량제 AI', 'LLM 최적화', 'PayPerChat']
      : ['AI cost savings', 'ChatGPT alternative', 'pay-per-use AI', 'LLM optimization', 'PayPerChat'],
    openGraph: {
      title: locale === 'ko' ? 'PayPerChat 블로그' : 'PayPerChat Blog',
      description: locale === 'ko' 
        ? 'AI 비용 최적화와 LLM 사용법 가이드'
        : 'AI Cost Optimization and LLM Usage Guides',
      type: 'website',
      images: [`${BASE_URL}/og-image.png`],
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      siteName: SITE_NAME
    },
    alternates: {
      canonical: url,
      languages: {
        'ko': `${BASE_URL}/ko${path}`,
        'en': `${BASE_URL}/en${path}`
      }
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export function generatePostMetadata(post: PostData, locale: Locale): MetadataConfig {
  const path = `/posts/${post.slug}`;
  const base = generateBaseMetadata(locale, path);
  
  const categoryNames = post.categories.map(slug => getCategoryDisplayName(slug, locale));
  const tagNames = post.tags.map(slug => getTagDisplayName(slug, locale));
  
  return {
    ...base,
    title: post.title, // 루트 레이아웃의 template 사용
    description: post.excerpt,
    keywords: [...tagNames, ...categoryNames, 'AI', 'LLM', 'PayPerChat'],
    openGraph: {
      ...base.openGraph!,
      title: post.title,
      description: post.excerpt,
      type: 'article',
      images: post.image ? [`${BASE_URL}${post.image}`] : base.openGraph!.images
    }
  };
}

export function generateCategoryMetadata(categorySlug: string, locale: Locale, postCount: number): MetadataConfig {
  const path = `/categories/${categorySlug}`;
  const base = generateBaseMetadata(locale, path);
  const categoryName = getCategoryDisplayName(categorySlug, locale);
  
  return {
    ...base,
    title: categoryName, // 루트 레이아웃의 template 사용
    description: locale === 'ko'
      ? `${categoryName} 관련 ${postCount}개의 글을 확인하세요. AI 비용 최적화와 효율적인 사용 방법에 대한 전문 가이드입니다.`
      : `Explore ${postCount} articles about ${categoryName}. Expert guides on AI cost optimization and efficient usage methods.`,
    keywords: [categoryName, 'AI', 'LLM', 'cost optimization', 'PayPerChat'],
    openGraph: {
      ...base.openGraph!,
      title: `${categoryName} | ${SITE_NAME}`,
      description: locale === 'ko'
        ? `${categoryName} 관련 ${postCount}개의 전문 가이드`
        : `${postCount} expert guides about ${categoryName}`
    }
  };
}

export function generateTagMetadata(tagSlug: string, locale: Locale, postCount: number): MetadataConfig {
  const path = `/tags/${tagSlug}`;
  const base = generateBaseMetadata(locale, path);
  const tagName = getTagDisplayName(tagSlug, locale);
  
  return {
    ...base,
    title: `#${tagName}`, // 루트 레이아웃의 template 사용
    description: locale === 'ko'
      ? `${tagName} 태그가 포함된 ${postCount}개의 글을 확인하세요. AI와 LLM 최적화에 대한 실용적인 팁과 가이드입니다.`
      : `Check out ${postCount} articles tagged with ${tagName}. Practical tips and guides for AI and LLM optimization.`,
    keywords: [tagName, 'AI', 'LLM', 'optimization', 'PayPerChat'],
    openGraph: {
      ...base.openGraph!,
      title: `#${tagName} | ${SITE_NAME}`,
      description: locale === 'ko'
        ? `${tagName} 태그 - ${postCount}개의 실용적인 가이드`
        : `${tagName} tag - ${postCount} practical guides`
    }
  };
}

export function generateListPageMetadata(type: 'categories' | 'tags' | 'posts', locale: Locale): MetadataConfig {
  const path = `/${type}`;
  const base = generateBaseMetadata(locale, path);
  
  const titles = {
    categories: locale === 'ko' ? '모든 카테고리' : 'All Categories',
    tags: locale === 'ko' ? '모든 태그' : 'All Tags', 
    posts: locale === 'ko' ? '모든 포스트' : 'All Posts'
  };
  
  const descriptions = {
    categories: locale === 'ko' 
      ? '관심 있는 주제별로 AI 최적화 가이드를 찾아보세요'
      : 'Find AI optimization guides by topic of interest',
    tags: locale === 'ko'
      ? '태그별로 관련 AI 가이드를 찾아보세요'
      : 'Find related AI guides by tags',
    posts: locale === 'ko'
      ? 'AI 비용 최적화와 LLM 사용법에 대한 모든 가이드를 확인하세요'
      : 'Explore all guides on AI cost optimization and LLM usage'
  };
  
  return {
    ...base,
    title: titles[type], // 루트 레이아웃의 template 사용
    description: descriptions[type],
    openGraph: {
      ...base.openGraph!,
      title: `${titles[type]} | ${SITE_NAME}`,
      description: descriptions[type]
    }
  };
}

// Next.js Metadata API용 변환 함수
export function toNextjsMetadata(config: MetadataConfig) {
  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    openGraph: config.openGraph,
    alternates: config.alternates,
    robots: config.robots
    // metadataBase는 루트 레이아웃에서 설정되므로 제거
  };
}