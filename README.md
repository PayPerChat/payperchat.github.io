# PayPerChat Blog

A modern, multilingual blog built with Next.js 15, designed to drive user acquisition for PayPerChat's pay-per-use AI service.

## Features

- ✅ **Next.js 15** with App Router for SSG/SSR
- ✅ **Multilingual Support** with next-intl (Korean/English, expandable to 10+ languages)
- ✅ **MDX Content** - Automatic markdown processing with frontmatter
- ✅ **SEO Optimized** - Meta tags, structured data, automatic sitemap.xml
- ✅ **GitHub Pages Deployment** - Automated with GitHub Actions
- ✅ **TypeScript** - Fully typed for reliability
- ✅ **Tailwind CSS** - Modern, responsive design
- ✅ **Language-specific Filtering** - Posts filtered by language
- ✅ **Categories & Tags** - Organized content structure

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Internationalization**: next-intl
- **Content**: MDX with gray-matter
- **Deployment**: GitHub Pages with Actions
- **SEO**: Automatic sitemap.xml, robots.txt, structured data

## Project Structure

```
payperchat-blog/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/          # Locale-based routing
│   │   ├── sitemap.ts         # Automatic sitemap generation
│   │   └── robots.ts          # SEO robots configuration
│   ├── components/            # Reusable React components
│   ├── content/               # Markdown content
│   │   ├── en/posts/         # English posts
│   │   └── ko/posts/         # Korean posts
│   ├── i18n/                 # Internationalization config
│   └── lib/                  # Utility functions
├── messages/                  # Translation files
├── .github/workflows/         # GitHub Actions
└── README.md
```

## Getting Started

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

### Building

```bash
# Build for production
npm run build

# Files will be generated in ./out/ directory
```

### Adding Content

1. Create markdown files in `src/content/[locale]/posts/`
2. Use the frontmatter structure:

```yaml
---
title: "Your Post Title"
excerpt: "Post description for SEO"
date: "2025-01-21"
categories:
  - "Category Name"
tags:
  - "payperchat"
  - "relevant-tag"
author: "Author Name"
image: "/assets/images/posts/image.png"
---

# Your content here...
```

## Deployment

The site automatically deploys to GitHub Pages when you push to the main branch. The GitHub Actions workflow:

1. Builds the Next.js application
2. Exports static files
3. Deploys to GitHub Pages

## SEO Features

- **Automatic Sitemap**: Generated at `/sitemap.xml`
- **Robots.txt**: SEO-friendly robots configuration
- **Structured Data**: JSON-LD for articles and website
- **Meta Tags**: Open Graph and Twitter cards
- **Language-specific URLs**: SEO-optimized locale routing

## Content Strategy

Focus on AI cost optimization and PayPerChat promotion:

- **Target Keywords**: AI 비용 절약, ChatGPT 대안, 종량제 AI
- **Content Quality**: 2000+ words, practical examples
- **PayPerChat Integration**: Natural service mentions and comparisons
- **Categories**: AI Fundamentals, Cost Optimization, Usage Guides

## Multilingual Support

- **Primary**: Korean (ko)
- **Secondary**: English (en)
- **Expandable**: Ready for 10+ languages
- **Language Switching**: Automatic detection and manual selection
- **Content Linking**: Cross-language post references via `ref` field

## Contributing

1. Add content to appropriate language directory
2. Follow frontmatter structure
3. Include PayPerChat value propositions naturally
4. Optimize for target keywords
5. Test locally before pushing

## License

This project is proprietary to PayPerChat.
