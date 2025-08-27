import { Locale } from '@/i18n/request';

export interface CategoryMapping {
  [slug: string]: {
    en: string;
    ko: string;
  };
}

export interface TagMapping {
  [slug: string]: {
    en: string;
    ko: string;
  };
}

export const categoryMappings: CategoryMapping = {
  'artificial-intelligence': {
    en: 'Artificial Intelligence',
    ko: '인공지능'
  }
};

export const tagMappings: TagMapping = {
  'ai-tokens': {
    en: 'AI Tokens',
    ko: '토큰'
  },
  'tokenization': {
    en: 'Tokenization',
    ko: '토큰화'
  },
  'chatgpt-pricing': {
    en: 'ChatGPT Pricing',
    ko: 'ChatGPT 가격'
  },
  'chatgpt-usage': {
    en: 'ChatGPT Usage',
    ko: 'ChatGPT 사용량'
  },
  'gpt-5': {
    en: 'ChatGPT 5',
    ko: 'ChatGPT 5'
  },
  'claude-4': {
    en: 'Claude 4',
    ko: 'Claude 4'
  },
  'gemini-2.5': {
    en: 'Gemini 2.5',
    ko: 'Gemini 2.5'
  },
  'ai-model-comparison': {
    en: 'AI model comparision',
    ko: 'AI 모델 비교'
  },
  'best-ai-model-2025': {
    en: 'best AI model 2025',
    ko: 'best AI model 2025'
  },
  'chatbot-accuracy': {
    en: 'chatbot accuracy',
    ko: '챗봇 정확도'
  },
  'llm': {
    en: 'LLM',
    ko: '거대언어모델'
  },
  'large-language-models': {
    en: 'Large Language Models',
    ko: '거대언어모델'
  },
  'machine-learning': {
    en: 'Machine Learning',
    ko: '머신러닝'
  },
  'neural-networks': {
    en: 'Neural Networks',
    ko: '신경망'
  },
  'natural-language-processing': {
    en: 'Natural Language Processing',
    ko: '자연어처리'
  }
};

export function getCategoryDisplayName(slug: string, locale: Locale): string {
  return categoryMappings[slug]?.[locale] || slug;
}

export function getTagDisplayName(slug: string, locale: Locale): string {
  return tagMappings[slug]?.[locale] || slug;
}

export function findCategorySlugByName(name: string, locale: Locale): string | null {
  for (const [slug, mapping] of Object.entries(categoryMappings)) {
    if (mapping[locale] === name) {
      return slug;
    }
  }
  return null;
}

export function findTagSlugByName(name: string, locale: Locale): string | null {
  for (const [slug, mapping] of Object.entries(tagMappings)) {
    if (mapping[locale] === name) {
      return slug;
    }
  }
  return null;
}

export function getAllCategoryMappingSlugs(): string[] {
  return Object.keys(categoryMappings);
}

export function getAllTagMappingSlugs(): string[] {
  return Object.keys(tagMappings);
}