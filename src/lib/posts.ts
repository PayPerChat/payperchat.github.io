import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import {Locale} from '@/i18n/request';

// Create URL-friendly slug from string
function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

export interface PostData {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  categories: string[];
  tags: string[];
  lang: Locale;
  ref?: string;
  content: string;
  readingTime: string;
  author?: string;
  image?: string;
}

const postsDirectory = path.join(process.cwd(), 'src/content');

export function getPostsDirectory(locale: Locale) {
  return path.join(postsDirectory, locale, 'posts');
}

export function getAllPosts(locale: Locale): PostData[] {
  const fullPath = getPostsDirectory(locale);
  
  if (!fs.existsSync(fullPath)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(fullPath);
  const allPosts = fileNames
    .filter((name) => name.endsWith('.md') || name.endsWith('.mdx'))
    .map((name) => {
      return getPostBySlug(name.replace(/\.mdx?$/, ''), locale);
    })
    .filter((post): post is PostData => post !== null)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return allPosts;
}

export function getPostBySlug(slug: string, locale: Locale): PostData | null {
  const fullPath = getPostsDirectory(locale);
  
  // Try both .md and .mdx extensions
  const realSlug = slug;
  let filePath = '';
  
  for (const ext of ['.md', '.mdx']) {
    const testPath = path.join(fullPath, `${slug}${ext}`);
    if (fs.existsSync(testPath)) {
      filePath = testPath;
      break;
    }
  }
  
  if (!filePath) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  return {
    slug: realSlug,
    title: data.title || '',
    excerpt: data.excerpt || '',
    date: data.date || '',
    categories: data.categories || [],
    tags: data.tags || [],
    lang: locale,
    ref: data.ref,
    content,
    readingTime: stats.text,
    author: data.author,
    image: data.image,
  };
}

export function getPostsByCategory(category: string, locale: Locale): PostData[] {
  const allPosts = getAllPosts(locale);
  return allPosts.filter((post) => 
    post.categories.some((cat) => 
      cat.toLowerCase() === category.toLowerCase()
    )
  );
}

export function getPostsByTag(tag: string, locale: Locale): PostData[] {
  const allPosts = getAllPosts(locale);
  return allPosts.filter((post) => 
    post.tags.some((t) => 
      t.toLowerCase() === tag.toLowerCase()
    )
  );
}

export function getAllCategories(locale: Locale): string[] {
  const allPosts = getAllPosts(locale);
  const categories = new Set<string>();
  
  allPosts.forEach((post) => {
    post.categories.forEach((category) => {
      categories.add(category);
    });
  });
  
  return Array.from(categories).sort();
}

export function getAllCategorySlugs(locale: Locale): {name: string, slug: string}[] {
  const categories = getAllCategories(locale);
  return categories.map(category => ({
    name: category,
    slug: createSlug(category)
  }));
}

export function getCategoryBySlug(slug: string, locale: Locale): string | null {
  const categories = getAllCategories(locale);
  return categories.find(category => createSlug(category) === slug) || null;
}

export function getAllTags(locale: Locale): string[] {
  const allPosts = getAllPosts(locale);
  const tags = new Set<string>();
  
  allPosts.forEach((post) => {
    post.tags.forEach((tag) => {
      tags.add(tag);
    });
  });
  
  return Array.from(tags).sort();
}

export function getAllTagSlugs(locale: Locale): {name: string, slug: string}[] {
  const tags = getAllTags(locale);
  return tags.map(tag => ({
    name: tag,
    slug: createSlug(tag)
  }));
}

export function getTagBySlug(slug: string, locale: Locale): string | null {
  const tags = getAllTags(locale);
  return tags.find(tag => createSlug(tag) === slug) || null;
}

export function getCategorySlug(categoryName: string): string {
  return createSlug(categoryName);
}

export function getTagSlug(tagName: string): string {
  return createSlug(tagName);
}

export function getStaticPaths(locales: Locale[]) {
  const paths = [];
  
  for (const locale of locales) {
    const posts = getAllPosts(locale);
    for (const post of posts) {
      paths.push({
        params: { slug: post.slug },
        locale: locale,
      });
    }
  }
  
  return paths;
}