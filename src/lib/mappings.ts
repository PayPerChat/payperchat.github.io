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
  'cost-optimization': {
    en: 'Cost Optimization',
    ko: '비용 최적화'
  }
};

export const tagMappings: TagMapping = {
  'payperchat': {
    en: 'payperchat',
    ko: 'payperchat'
  },
  'chatgpt-plus': {
    en: 'chatgpt-plus',
    ko: 'chatgpt-plus'
  },
  'ai-cost-savings': {
    en: 'ai-cost-savings',
    ko: 'ai-비용절약'
  },
  'pay-per-use': {
    en: 'pay-per-use',
    ko: '종량제'
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