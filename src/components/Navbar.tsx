'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter, usePathname } from '@/i18n/navigation';
import { useState } from 'react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
];

export default function Navbar() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLanguageChange = (newLocale: string) => {
    // For tag and category pages, check if the content exists in target locale
    // If not, redirect to the index page of that section
    let targetPath = pathname;
    
    if (pathname.includes('/tags/') || pathname.includes('/categories/')) {
      // Extract the base path (e.g., /tags or /categories)
      const segments = pathname.split('/');
      if (segments.length >= 2) {
        const basePath = `/${segments[1]}`;
        targetPath = basePath;
      }
    }
    
    router.push(targetPath, { locale: newLocale });
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="container mx-auto">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="font-bold text-xl text-gray-900 hover:text-blue-600 transition-colors">
            {t('layout.title')}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              href="/"
              className="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
            >
              {t('navigation.home')}
            </Link>
            <Link 
              href="/categories"
              className="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
            >
              {t('navigation.categories')}
            </Link>
            <Link 
              href="/tags"
              className="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
            >
              {t('navigation.tags')}
            </Link>

            {/* Language Selector */}
            <div className="ml-4">
              <select
                value={locale}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white">
            <div className="space-y-1">
              <Link 
                href="/"
                className="block px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('navigation.home')}
              </Link>
              <Link 
                href="/categories"
                className="block px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('navigation.categories')}
              </Link>
              <Link 
                href="/tags"
                className="block px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('navigation.tags')}
              </Link>
              
              {/* Mobile Language Selector */}
              <div className="px-4 py-2">
                <select
                  value={locale}
                  onChange={(e) => {
                    handleLanguageChange(e.target.value);
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}