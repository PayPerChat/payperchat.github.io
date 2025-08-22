import { MetadataRoute } from 'next'
import { getAllPosts, getAllCategories, getAllTags } from '@/lib/posts'
import { routing } from '@/i18n/routing'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://payperchat.github.io'
  const routes: MetadataRoute.Sitemap = []

  // Add homepage for each locale
  routing.locales.forEach(locale => {
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    })
  })

  // Add static pages for each locale
  const staticPages = ['posts', 'categories', 'tags']
  routing.locales.forEach(locale => {
    staticPages.forEach(page => {
      routes.push({
        url: `${baseUrl}/${locale}/${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    })
  })

  // Add all posts
  routing.locales.forEach(locale => {
    const posts = getAllPosts(locale)
    posts.forEach(post => {
      routes.push({
        url: `${baseUrl}/${locale}/posts/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    })
  })

  // Add category pages
  routing.locales.forEach(locale => {
    const categories = getAllCategories(locale)
    categories.forEach(category => {
      routes.push({
        url: `${baseUrl}/${locale}/categories/${encodeURIComponent(category)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
      })
    })
  })

  // Add tag pages
  routing.locales.forEach(locale => {
    const tags = getAllTags(locale)
    tags.forEach(tag => {
      routes.push({
        url: `${baseUrl}/${locale}/tags/${encodeURIComponent(tag)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.5,
      })
    })
  })

  return routes
}