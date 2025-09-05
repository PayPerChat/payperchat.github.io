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

const TEXT = {
  ko: {
    siteName: 'PayPerChat 블로그',
    baseTitle: 'PayPerChat 블로그',
    baseDescription: 'AI 비용 최적화와 LLM 사용법 가이드 - 종량제 AI 서비스로 70% 절약하세요',
    ogDescription: 'AI 비용 최적화와 LLM 사용법 가이드',
    keywords: ['AI 비용절약', 'ChatGPT 대안', '종량제 AI', 'LLM 최적화', 'PayPerChat'],
    ogLocale: 'ko_KR',
    listTitles: {
      categories: '모든 카테고리',
      tags: '모든 태그',
      posts: '모든 포스트',
    },
    listDescriptions: {
      categories: '관심 있는 주제별로 AI 최적화 가이드를 찾아보세요',
      tags: '태그별로 관련 AI 가이드를 찾아보세요',
      posts: 'AI 비용 최적화와 LLM 사용법에 대한 모든 가이드를 확인하세요',
    },
    category: {
      desc: (name: string, cnt: number) =>
          `${name} 관련 ${cnt}개의 글을 확인하세요. AI 비용 최적화와 효율적인 사용 방법에 대한 전문 가이드입니다.`,
      ogDesc: (name: string, cnt: number) =>
          `${name} 관련 ${cnt}개의 전문 가이드`,
      keywords: (name: string) => [name, 'AI', 'LLM', 'cost optimization', 'PayPerChat'],
    },
    tag: {
      desc: (name: string, cnt: number) =>
          `${name} 태그가 포함된 ${cnt}개의 글을 확인하세요. AI와 LLM 최적화에 대한 실용적인 팁과 가이드입니다.`,
      ogDesc: (name: string, cnt: number) =>
          `${name} 태그 - ${cnt}개의 실용적인 가이드`,
      keywords: (name: string) => [name, 'AI', 'LLM', 'optimization', 'PayPerChat'],
    },
  },
  en: {
    siteName: 'PayPerChat Blog',
    baseTitle: 'PayPerChat Blog',
    baseDescription: 'AI Cost Optimization and LLM Usage Guides - Save 70% with Pay-Per-Use AI Services',
    ogDescription: 'AI Cost Optimization and LLM Usage Guides',
    keywords: ['AI cost savings', 'ChatGPT alternative', 'pay-per-use AI', 'LLM optimization', 'PayPerChat'],
    ogLocale: 'en_US',
    listTitles: {
      categories: 'All Categories',
      tags: 'All Tags',
      posts: 'All Posts',
    },
    listDescriptions: {
      categories: 'Find AI optimization guides by topic of interest',
      tags: 'Find related AI guides by tags',
      posts: 'Explore all guides on AI cost optimization and LLM usage',
    },
    category: {
      desc: (name: string, cnt: number) =>
          `Explore ${cnt} articles about ${name}. Expert guides on AI cost optimization and efficient usage methods.`,
      ogDesc: (name: string, cnt: number) =>
          `${cnt} expert guides about ${name}`,
      keywords: (name: string) => [name, 'AI', 'LLM', 'cost optimization', 'PayPerChat'],
    },
    tag: {
      desc: (name: string, cnt: number) =>
          `Check out ${cnt} articles tagged with ${name}. Practical tips and guides for AI and LLM optimization.`,
      ogDesc: (name: string, cnt: number) =>
          `${name} tag - ${cnt} practical guides`,
      keywords: (name: string) => [name, 'AI', 'LLM', 'optimization', 'PayPerChat'],
    },
  },
  ja: {
    siteName: 'PayPerChat ブログ',
    baseTitle: 'PayPerChat ブログ',
    baseDescription: 'AIコスト最適化とLLM活用ガイド — 従量課金型AIサービスで最大70%節約',
    ogDescription: 'AIコスト最適化とLLM活用ガイド',
    keywords: ['AI コスト削減', 'ChatGPT 代替', '従量課金 AI', 'LLM 最適化', 'PayPerChat'],
    ogLocale: 'ja_JP',
    listTitles: {
      categories: 'すべてのカテゴリー',
      tags: 'すべてのタグ',
      posts: 'すべての投稿',
    },
    listDescriptions: {
      categories: '関心のあるトピック別にAI最適化ガイドを見つけましょう',
      tags: 'タグ別に関連するAIガイドを見つけましょう',
      posts: 'AIコスト最適化とLLM活用法に関するすべてのガイドをチェックしましょう',
    },
    category: {
      desc: (name: string, cnt: number) =>
          `${name} に関する ${cnt} 件の記事をチェックしましょう。AIコスト最適化と効率的な活用法の専門ガイドです.`,
      ogDesc: (name: string, cnt: number) =>
          `${name} に関する専門ガイド（${cnt} 件）`,
      keywords: (name: string) => [name, 'AI', 'LLM', 'コスト最適化', 'PayPerChat'],
    },
    tag: {
      desc: (name: string, cnt: number) =>
          `${name} タグが付いた記事を ${cnt} 件チェックしましょう。AI と LLM 最適化の実用的なヒントとガイドです。`,
      ogDesc: (name: string, cnt: number) =>
          `${name} タグ — 実用的なガイド ${cnt} 件`,
      keywords: (name: string) => [name, 'AI', 'LLM', '最適化', 'PayPerChat'],
    },
  },
} as const;

function pickText(locale: Locale) {
  return TEXT[locale as 'ko' | 'en' | 'ja'] ?? TEXT.en;
}

export function generateBaseMetadata(locale: Locale, path: string = ''): MetadataConfig {
  const t = pickText(locale);
  const url = `${BASE_URL}/${locale}${path}`;
  const locales = ['ko', 'en', 'ja'] as const;

  return {
    title: t.baseTitle,
    description: t.baseDescription,
    keywords: [...t.keywords],
    openGraph: {
      title: t.baseTitle,
      description: t.ogDescription,
      type: 'website',
      images: [`${BASE_URL}/og-image.png`],
      locale: t.ogLocale,
      siteName: t.siteName,
    },
    alternates: {
      canonical: url,
      languages: {
        ko: `${BASE_URL}/ko${path}`,
        en: `${BASE_URL}/en${path}`,
        ja: `${BASE_URL}/ja${path}`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generatePostMetadata(post: PostData, locale: Locale): MetadataConfig {
  const path = `/posts/${post.slug}`;
  const base = generateBaseMetadata(locale, path);
  const categoryNames = post.categories.map((slug) => getCategoryDisplayName(slug, locale));
  const tagNames = post.tags.map((slug) => getTagDisplayName(slug, locale));

  return {
    ...base,
    title: post.title,
    description: post.excerpt,
    keywords: [...tagNames, ...categoryNames, 'AI', 'LLM', 'PayPerChat'],
    openGraph: {
      ...base.openGraph!,
      title: post.title,
      description: post.excerpt,
      type: 'article',
      images: post.image ? [`${BASE_URL}${post.image}`] : base.openGraph!.images,
    },
  };
}

export function generateCategoryMetadata(categorySlug: string, locale: Locale, postCount: number): MetadataConfig {
  const path = `/categories/${categorySlug}`;
  const base = generateBaseMetadata(locale, path);
  const t = pickText(locale);
  const categoryName = getCategoryDisplayName(categorySlug, locale);

  return {
    ...base,
    title: categoryName,
    description: t.category.desc(categoryName, postCount),
    keywords: t.category.keywords(categoryName),
    openGraph: {
      ...base.openGraph!,
      title: `${categoryName} | ${t.siteName}`,
      description: t.category.ogDesc(categoryName, postCount),
    },
  };
}

export function generateTagMetadata(tagSlug: string, locale: Locale, postCount: number): MetadataConfig {
  const path = `/tags/${tagSlug}`;
  const base = generateBaseMetadata(locale, path);
  const t = pickText(locale);
  const tagName = getTagDisplayName(tagSlug, locale);

  return {
    ...base,
    title: `#${tagName}`,
    description: t.tag.desc(tagName, postCount),
    keywords: t.tag.keywords(tagName),
    openGraph: {
      ...base.openGraph!,
      title: `#${tagName} | ${t.siteName}`,
      description: t.tag.ogDesc(tagName, postCount),
    },
  };
}

export function generateListPageMetadata(type: 'categories' | 'tags' | 'posts', locale: Locale): MetadataConfig {
  const path = `/${type}`;
  const base = generateBaseMetadata(locale, path);
  const t = pickText(locale);

  const titles = t.listTitles;
  const descriptions = t.listDescriptions;

  return {
    ...base,
    title: titles[type],
    description: descriptions[type],
    openGraph: {
      ...base.openGraph!,
      title: `${titles[type]} | ${t.siteName}`,
      description: descriptions[type],
    },
  };
}

// Next.js Metadata API용 변환 함수
export function toNextjsMetadata(config: MetadataConfig) {
  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords ? [...config.keywords] : undefined,
    openGraph: config.openGraph,
    alternates: config.alternates,
    robots: config.robots,
    // metadataBase는 루트 레이아웃에서 설정되므로 제거
  };
}