import { Locale } from '@/i18n/request';

export interface CategoryMapping {
  [slug: string]: {
    en: string;
    ko: string;
    ja: string;
  };
}

export interface TagMapping {
  [slug: string]: {
    en: string;
    ko: string;
    ja: string;
  };
}

export const categoryMappings: CategoryMapping = {
  'artificial-intelligence': {
    en: 'Artificial Intelligence',
    ko: '인공지능',
    ja: '人工知能'
  }
};

export const tagMappings: TagMapping = {
  'ai-tokens': {
    en: 'AI Tokens',
    ko: '토큰',
    ja: 'AIトークン'
  },
  'tokenization': {
    en: 'Tokenization',
    ko: '토큰화',
    ja: 'トークン化'
  },
  'chatgpt-pricing': {
    en: 'ChatGPT Pricing',
    ko: 'ChatGPT 가격',
    ja: 'ChatGPT価格'
  },
  'chatgpt-usage': {
    en: 'ChatGPT Usage',
    ko: 'ChatGPT 사용량',
    ja: 'ChatGPT利用'
  },
  'gpt-5': {
    en: 'ChatGPT 5',
    ko: 'ChatGPT 5',
    ja: 'ChatGPT 5'
  },
  'claude-4': {
    en: 'Claude 4',
    ko: 'Claude 4',
    ja: 'Claude 4'
  },
  'gemini-2.5': {
    en: 'Gemini 2.5',
    ko: 'Gemini 2.5',
    ja: 'Gemini 2.5'
  },
  'ai-model-comparison': {
    en: 'AI model comparision',
    ko: 'AI 모델 비교',
    ja: 'AIモデル比較'
  },
  'best-ai-model-2025': {
    en: 'best AI model 2025',
    ko: 'best AI model 2025',
    ja: '最高のAIモデル2025'
  },
  'chatbot-accuracy': {
    en: 'chatbot accuracy',
    ko: '챗봇 정확도',
    ja: 'チャットボット精度'
  },
  'llm': {
    en: 'LLM',
    ko: '거대언어모델',
    ja: 'LLM'
  },
  'large-language-models': {
    en: 'Large Language Models',
    ko: '거대언어모델',
    ja: '大規模言語モデル'
  },
  'machine-learning': {
    en: 'Machine Learning',
    ko: '머신러닝',
    ja: '機械学習'
  },
  'neural-networks': {
    en: 'Neural Networks',
    ko: '신경망',
    ja: 'ニューラルネットワーク'
  },
  'natural-language-processing': {
    en: 'Natural Language Processing',
    ko: '자연어처리',
    ja: '自然言語処理'
  },
  'prompt-engineering': {
    en: 'Prompt Engineering',
    ko: '프롬프트 엔지니어링',
    ja: 'プロンプトエンジニアリング'
  },
  'ai-prompts': {
    en: 'AI Prompts',
    ko: 'AI 프롬프트',
    ja: 'AIプロンプト'
  },
  'prompt-techniques': {
    en: 'Prompt Techniques',
    ko: '프롬프트 기법',
    ja: 'プロンプト技術'
  },
  'few-shot-prompting': {
    en: 'Few-shot Prompting',
    ko: '퓨샷 프롬프팅',
    ja: 'フューショットプロンプティング'
  },
  'zero-shot-prompting': {
    en: 'Zero-shot Prompting',
    ko: '제로샷 프롬프팅',
    ja: 'ゼロショットプロンプティング'
  },
  'chain-of-thought': {
    en: 'Chain of Thought',
    ko: '사고 연쇄',
    ja: '思考の連鎖'
  },
  'prompt-optimization': {
    en: 'Prompt Optimization',
    ko: '프롬프트 최적화',
    ja: 'プロンプト最適化'
  },
  'ai-communication': {
    en: 'AI Communication',
    ko: 'AI 커뮤니케이션',
    ja: 'AIコミュニケーション'
  },
  'prompt-best-practices': {
    en: 'Prompt Best Practices',
    ko: '프롬프트 모범 사례',
    ja: 'プロンプトベストプラクティス'
  },
  'gpt-5-features': {
    en: 'GPT-5 Features',
    ko: 'GPT-5 기능',
    ja: 'GPT-5機能'
  },
  'openai-updates': {
    en: 'OpenAI Updates',
    ko: 'OpenAI 업데이트',
    ja: 'OpenAIアップデート'
  },
  'ai-reasoning': {
    en: 'AI Reasoning',
    ko: 'AI 추론',
    ja: 'AI推論'
  },
  'multimodal-ai': {
    en: 'Multimodal AI',
    ko: '멀티모달 AI',
    ja: 'マルチモーダルAI'
  },
  'claude-features': {
    en: 'Claude Features',
    ko: 'Claude 기능',
    ja: 'Claude機能'
  },
  'anthropic-updates': {
    en: 'Anthropic Updates',
    ko: 'Anthropic 업데이트',
    ja: 'Anthropicアップデート'
  },
  'coding-ai': {
    en: 'Coding AI',
    ko: '코딩 AI',
    ja: 'コーディングAI'
  },
  'ai-agents': {
    en: 'AI Agents',
    ko: 'AI 에이전트',
    ja: 'AIエージェント'
  },
  'gemini-2.5-flash': {
    en: 'Gemini 2.5 Flash',
    ko: 'Gemini 2.5 Flash',
    ja: 'Gemini 2.5 Flash'
  },
  'gemini-2.5-pro': {
    en: 'Gemini 2.5 Pro',
    ko: 'Gemini 2.5 Pro',
    ja: 'Gemini 2.5 Pro'
  },
  'deep-think': {
    en: 'Deep Think',
    ko: '딥싱크',
    ja: 'ディープシンク'
  },
  'thinking-models': {
    en: 'Thinking Models',
    ko: '사고 모델',
    ja: '思考モデル'
  },
  'context-window': {
    en: 'Context Window',
    ko: '컨텍스트 윈도우',
    ja: 'コンテキストウィンドウ'
  },
  'google-ai': {
    en: 'Google AI',
    ko: 'Google AI',
    ja: 'Google AI'
  },
  'api-pricing': {
    en: 'API Pricing',
    ko: 'API 가격',
    ja: 'API価格'
  },
  'claude-max-plan': {
    en: 'Claude Max Plan',
    ko: 'Claude Max Plan',
    ja: 'Claude Maxプラン'
  },
  'claude-pricing': {
    en: 'Claude Pricing',
    ko: 'Claude 가격',
    ja: 'Claude価格'
  },
  'subscription-pricing': {
    en: 'Subscription Pricing',
    ko: '구독 가격',
    ja: 'サブスクリプション価格'
  },
  'ai-cost-comparison': {
    en: 'AI Cost Comparison',
    ko: 'AI 비용 비교',
    ja: 'AIコスト比較'
  },
  'ai-image-generation': {
    en: 'AI Image Generation',
    ko: 'AI 이미지 생성',
    ja: 'AI画像生成'
  },
  'nano-banana': {
    en: 'Nano Banana',
    ko: '나노 바나나',
    ja: 'ナノバナナ'
  },
  'image-editing-ai': {
    en: 'Image Editing AI',
    ko: 'AI 이미지 편집',
    ja: 'AI画像編集'
  },
  'synthid-watermark': {
    en: 'SynthID Watermark',
    ko: 'SynthID 워터마크',
    ja: 'SynthID透かし'
  },
  'chatgpt-pro-plan': {
    en: 'ChatGPT Pro Plan',
    ko: 'ChatGPT Pro 플랜',
    ja: 'ChatGPT Proプラン'
  },
  'openai-pricing': {
    en: 'OpenAI Pricing',
    ko: 'OpenAI 가격',
    ja: 'OpenAI価格'
  },
  'ai-subscription-plans': {
    en: 'AI Subscription Plans',
    ko: 'AI 구독 플랜',
    ja: 'AIサブスクリプションプラン'
  },
  'practical-ai-guide': {
    en: 'Practical AI Guide',
    ko: '실용적인 AI 가이드',
    ja: '実用的AIガイド'
  },
  'ai-for-business': {
    en: 'AI for Business',
    ko: '비즈니스용 AI',
    ja: 'ビジネス向けAI'
  },
  'ai-productivity': {
    en: 'AI Productivity',
    ko: 'AI 생산성',
    ja: 'AI生産性'
  },
  'cost-effective-ai': {
    en: 'Cost-effective AI',
    ko: '비용 효율적인 AI',
    ja: '費用対効果の高いAI'
  },
  'workflow-automation': {
    en: 'Workflow Automation',
    ko: '워크플로우 자동화',
    ja: 'ワークフロー自動化'
  },
  'ai-tool-selection': {
    en: 'AI Tool Selection',
    ko: 'AI 도구 선택',
    ja: 'AIツール選択'
  },
  'pay-per-use-ai': {
    en: 'Pay-per-use AI',
    ko: '종량제 AI',
    ja: '従量制AI'
  },
  'thinking-budgets': {
    en: 'Thinking Budgets',
    ko: '사고 예산',
    ja: '思考予算'
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