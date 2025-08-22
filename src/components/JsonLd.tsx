import { PostData } from '@/lib/posts';

interface JsonLdProps {
  post?: PostData;
  locale: string;
}

export default function JsonLd({ post, locale }: JsonLdProps) {
  const baseUrl = 'https://payperchat.github.io';

  if (post) {
    // Article structured data
    const articleData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.excerpt,
      image: post.image ? `${baseUrl}${post.image}` : undefined,
      datePublished: post.date,
      dateModified: post.date,
      author: {
        '@type': 'Organization',
        name: 'PayPerChat',
        url: 'https://payperchat.org'
      },
      publisher: {
        '@type': 'Organization',
        name: 'PayPerChat Blog',
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/favicon.ico`
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${baseUrl}/${locale}/posts/${post.slug}`
      },
      articleSection: post.categories[0],
      keywords: post.tags.join(', '),
      inLanguage: locale === 'ko' ? 'ko-KR' : 'en-US'
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData) }}
      />
    );
  }

  // Website structured data
  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'PayPerChat Blog',
    description: locale === 'ko' 
      ? 'AI 비용 최적화와 LLM 사용법 가이드' 
      : 'AI Cost Optimization and LLM Usage Guides',
    url: `${baseUrl}/${locale}`,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/${locale}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    },
    publisher: {
      '@type': 'Organization',
      name: 'PayPerChat',
      url: 'https://payperchat.org',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/favicon.ico`
      }
    },
    inLanguage: locale === 'ko' ? 'ko-KR' : 'en-US'
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
    />
  );
}