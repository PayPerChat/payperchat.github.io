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
  },
  'prompt-engineering': {
    en: 'Prompt Engineering',
    ko: '프롬프트 엔지니어링'
  },
  'ai-prompts': {
    en: 'AI Prompts',
    ko: 'AI 프롬프트'
  },
  'prompt-techniques': {
    en: 'Prompt Techniques',
    ko: '프롬프트 기법'
  },
  'few-shot-prompting': {
    en: 'Few-shot Prompting',
    ko: '퓨샷 프롬프팅'
  },
  'zero-shot-prompting': {
    en: 'Zero-shot Prompting',
    ko: '제로샷 프롬프팅'
  },
  'chain-of-thought': {
    en: 'Chain of Thought',
    ko: '사고 연쇄'
  },
  'prompt-optimization': {
    en: 'Prompt Optimization',
    ko: '프롬프트 최적화'
  },
  'ai-communication': {
    en: 'AI Communication',
    ko: 'AI 커뮤니케이션'
  },
  'prompt-best-practices': {
    en: 'Prompt Best Practices',
    ko: '프롬프트 모범 사례'
  },
  'gpt-5-features': {
    en: 'GPT-5 Features',
    ko: 'GPT-5 기능'
  },
  'openai-updates': {
    en: 'OpenAI Updates',
    ko: 'OpenAI 업데이트'
  },
  'ai-reasoning': {
    en: 'AI Reasoning',
    ko: 'AI 추론'
  },
  'multimodal-ai': {
    en: 'Multimodal AI',
    ko: '멀티모달 AI'
  },
  'claude-features': {
    en: 'Claude Features',
    ko: 'Claude 기능'
  },
  'anthropic-updates': {
    en: 'Anthropic Updates',
    ko: 'Anthropic 업데이트'
  },
  'coding-ai': {
    en: 'Coding AI',
    ko: '코딩 AI'
  },
  'ai-agents': {
    en: 'AI Agents',
    ko: 'AI 에이전트'
  },
  'gemini-2.5-flash': {
    en: 'Gemini 2.5 Flash',
    ko: 'Gemini 2.5 Flash'
  },
  'gemini-2.5-pro': {
    en: 'Gemini 2.5 Pro',
    ko: 'Gemini 2.5 Pro'
  },
  'deep-think': {
    en: 'Deep Think',
    ko: '딥싱크'
  },
  'thinking-models': {
    en: 'Thinking Models',
    ko: '사고 모델'
  },
  'context-window': {
    en: 'Context Window',
    ko: '컨텍스트 윈도우'
  },
  'google-ai': {
    en: 'Google AI',
    ko: 'Google AI'
  },
  'api-pricing': {
    en: 'API Pricing',
    ko: 'API 가격'
  },
  'claude-max-plan': {
    en: 'Claude Max Plan',
    ko: 'Claude Max Plan'
  },
  'claude-pricing': {
    en: 'Claude Pricing',
    ko: 'Claude 가격'
  },
  'subscription-pricing': {
    en: 'Subscription Pricing',
    ko: '구독 가격'
  },
  'ai-cost-comparison': {
    en: 'AI Cost Comparison',
    ko: 'AI 비용 비교'
  },
  'ai-image-generation': {
    en: 'AI Image Generation',
    ko: 'AI 이미지 생성'
  },
  'nano-banana': {
    en: 'Nano Banana',
    ko: '나노 바나나'
  },
  'image-editing-ai': {
    en: 'Image Editing AI',
    ko: 'AI 이미지 편집'
  },
  'synthid-watermark': {
    en: 'SynthID Watermark',
    ko: 'SynthID 워터마크'
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