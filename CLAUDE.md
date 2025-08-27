# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **PayPerChat promotional blog** built with Next.js 15, TypeScript, and MDX. The primary goal is driving user acquisition for PayPerChat's pay-per-use AI service through SEO-optimized content in Korean and English.

**Key Architecture:**
- **Next.js 15** with App Router and static site generation (`npm run build`)
- **Multilingual support** via next-intl (Korean primary, English secondary)
- **MDX content** stored in `src/content/[locale]/posts/` with gray-matter frontmatter
- **Static deployment** to GitHub Pages via GitHub Actions

## Essential Commands

```bash
# Development
npm install         # Install dependencies
npm run dev         # Start dev server (localhost:3000)
npm run build       # Build for production (outputs to ./out/)
npm run start       # Start production server
npm run lint        # Run ESLint

# Deployment
git push origin main  # Triggers GitHub Actions deployment to Pages
```

## Content Architecture

### Directory Structure
```
src/content/
├── en/posts/       # English blog posts
└── ko/posts/       # Korean blog posts (primary)

public/assets/images/posts/  # Post images
```

### MDX Post Structure
All posts require specific frontmatter:
```yaml
---
title: "SEO-optimized title (50-60 chars)"
excerpt: "Meta description (120-150 chars)"
date: "2025-01-22"  # YYYY-MM-DD format
categories:
  - "artificial-intelligence"  # Use slug keys from mappings.ts
tags:
  - "ai-tokens"  # Use slug keys from mappings.ts
  - "chatgpt-pricing"
author: "PayPerChat"
image: "/assets/images/posts/filename.png"
---
```

### Categories and Tags System
Categories and tags use **slug-based mapping** via `src/lib/mappings.ts` for multilingual display:

**Current Categories:**
- `artificial-intelligence` → "Artificial Intelligence" (EN) / "인공지능" (KO)

**Current Tags:**
- `ai-tokens` → "AI Tokens" / "토큰"
- `tokenization` → "Tokenization" / "토큰화"  
- `chatgpt-pricing` → "ChatGPT Pricing" / "ChatGPT 가격"
- `chatgpt-usage` → "ChatGPT Usage" / "ChatGPT 사용량"
- `gpt-5` → "ChatGPT 5" / "ChatGPT 5"
- `claude-4` → "Claude 4" / "Claude 4"
- `gemini-2.5` → "Gemini 2.5" / "Gemini 2.5"
- `ai-model-comparison` → "AI model comparision" / "AI 모델 비교"
- `best-ai-model-2025` → "best AI model 2025" / "best AI model 2025"
- `chatbot-accuracy` → "chatbot accuracy" / "챗봇 정확도"

**Important**: Always use the **slug keys** in frontmatter, not display names.

## Core System Components

### Post Processing Pipeline
1. **Posts Library** (`src/lib/posts.ts`): Central content processing
   - `getAllPosts(locale)`: Retrieves all posts for a locale
   - `getPostBySlug()`: Individual post lookup
   - `getPostsByCategory/Tag()`: Filtered retrieval
   - Gray-matter frontmatter parsing with reading-time calculation

2. **Routing System** (`src/i18n/routing.ts`): 
   - Supports `['en', 'ko']` locales with 'en' default
   - Locale-based URL routing: `/[locale]/posts/[slug]`

3. **Mapping System** (`src/lib/mappings.ts`): Category/tag multilingual display
   - `getCategoryDisplayName(slug, locale)`: Get localized category name
   - `getTagDisplayName(slug, locale)`: Get localized tag name  
   - `findCategorySlugByName()`: Reverse lookup slug from display name
   - `findTagSlugByName()`: Reverse lookup slug from display name

### Page Generation Strategy
- **Static Generation**: All routes pre-generated at build time
- **Locale-aware routing**: `/en/posts/slug` and `/ko/posts/slug`
- **Category/Tag pages**: Dynamic filtering with static generation
- **SEO optimization**: Automatic sitemap.xml, robots.txt generation

## Content Strategy Requirements

This blog has a **specific commercial purpose** - driving PayPerChat user acquisition through valuable content with subtle promotion.

### Content Guidelines
- **Target audience**: Users looking to save AI costs, alternatives to ChatGPT Plus
- **Content quality**: 2500+ words (Korean), 2000+ words (English)
- **PayPerChat integration**: Natural mentions (not promotional), include payperchat.org links
- **SEO focus**: Target keywords like "AI 비용 절약", "ChatGPT 대안", "종량제 AI"

### Writing Process
1. **Research**: Verify all pricing data at payperchat.org/pricing
2. **Structure**: Problem → Solution → Examples → PayPerChat value → Conclusion
3. **SEO**: Include target keywords in H2 tags, maintain 1-2% keyword density
4. **Validation**: Fact-check all claims, verify external links

## Development Notes

- **Deployment**: Automatic via GitHub Actions on push to main
- **Images**: Store in `/public/assets/images/posts/` with descriptive filenames
- **Internationalization**: Use consistent ref field for cross-language post linking
- **Mobile-first**: Content optimized for mobile reading experience

## Important Files Reference

- `src/lib/posts.ts`: Core content processing logic
- `src/lib/mappings.ts`: Category/tag multilingual mapping system
- `src/content/[locale]/posts/`: All blog content
- `CLAUDE_BLOG_GUIDE.yml`: Comprehensive content strategy (Korean)
- `src/i18n/routing.ts`: Locale configuration
- `package.json`: Available scripts and dependencies