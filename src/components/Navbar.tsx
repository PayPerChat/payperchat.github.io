'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname as useNextPathname } from 'next/navigation';
import { useState } from 'react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
];

export default function Navbar() {
  const t = useTranslations();
  const locale = useLocale();
  const nextPathname = useNextPathname(); // Next.js 기본 pathname
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === locale) return; // 같은 언어면 무시
    
    // 현재 경로에서 로케일 부분을 제거
    let pathWithoutLocale = nextPathname;
    if (nextPathname.startsWith(`/${locale}`)) {
      pathWithoutLocale = nextPathname.slice(`/${locale}`.length) || '/';
    }
    
    // 새로운 로케일로 경로 구성
    const newPath = `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
    
    // 페이지 이동
    window.location.href = newPath;
  };

  return (
    <nav className="bg-white/95 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="font-bold text-xl text-blue-600 hover:text-blue-700 transition-colors">
            {t('layout.title')}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              href={`/${locale}`}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
            >
              {t('navigation.home')}
            </Link>
            <Link 
              href={`/${locale}/categories`}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
            >
              {t('navigation.categories')}
            </Link>
            <Link 
              href={`/${locale}/tags`}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
            >
              {t('navigation.tags')}
            </Link>

            {/* Language Selector */}
            <div className="ml-4">
              <select
                key={`lang-select-${locale}`}
                value=""
                onChange={(e) => {
                  if (e.target.value) {
                    handleLanguageChange(e.target.value);
                  }
                }}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option value="" disabled>
                  {languages.find(lang => lang.code === locale)?.flag} {languages.find(lang => lang.code === locale)?.name}
                </option>
                {languages.filter(lang => lang.code !== locale).map((lang) => (
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
                href={`/${locale}`}
                className="block px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('navigation.home')}
              </Link>
              <Link 
                href={`/${locale}/categories`}
                className="block px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('navigation.categories')}
              </Link>
              <Link 
                href={`/${locale}/tags`}
                className="block px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('navigation.tags')}
              </Link>
              
              {/* Mobile Language Selector */}
              <div className="px-4 py-2">
                <select
                  key={`mobile-lang-select-${locale}`}
                  value=""
                  onChange={(e) => {
                    if (e.target.value) {
                      handleLanguageChange(e.target.value);
                      setIsMenuOpen(false);
                    }
                  }}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled>
                    {languages.find(lang => lang.code === locale)?.flag} {languages.find(lang => lang.code === locale)?.name}
                  </option>
                  {languages.filter(lang => lang.code !== locale).map((lang) => (
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