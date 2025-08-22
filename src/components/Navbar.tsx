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
    // Navigate to the same path but with the new locale
    router.push(pathname, { locale: newLocale });
  };

  return (
    <nav className="bg-gray-950/95 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-purple-300 transition-all duration-200">
            {t('layout.title')}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <Link 
              href="/"
              className="px-6 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-xl transition-all duration-200 font-medium"
            >
              {t('navigation.home')}
            </Link>
            <Link 
              href="/categories"
              className="px-6 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-xl transition-all duration-200 font-medium"
            >
              {t('navigation.categories')}
            </Link>
            <Link 
              href="/tags"
              className="px-6 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-xl transition-all duration-200 font-medium"
            >
              {t('navigation.tags')}
            </Link>

            {/* Language Selector */}
            <div className="ml-6">
              <select
                value={locale}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="appearance-none bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm font-medium cursor-pointer hover:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-white"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-gray-800">
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-3 hover:bg-gray-800 rounded-xl transition-colors text-gray-300"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-gray-800 bg-gray-950/95 backdrop-blur-lg">
            <div className="space-y-2">
              <Link 
                href="/"
                className="block px-6 py-4 text-gray-300 hover:text-white hover:bg-gray-800 rounded-xl transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('navigation.home')}
              </Link>
              <Link 
                href="/categories"
                className="block px-6 py-4 text-gray-300 hover:text-white hover:bg-gray-800 rounded-xl transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('navigation.categories')}
              </Link>
              <Link 
                href="/tags"
                className="block px-6 py-4 text-gray-300 hover:text-white hover:bg-gray-800 rounded-xl transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('navigation.tags')}
              </Link>
              
              {/* Mobile Language Selector */}
              <div className="px-6 py-2">
                <select
                  value={locale}
                  onChange={(e) => {
                    handleLanguageChange(e.target.value);
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm font-medium cursor-pointer hover:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code} className="bg-gray-800">
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