import { Locale } from '@/i18n/request';

export function formatDate(date: string, locale: Locale): string {
  return new Date(date).toLocaleDateString(locale === 'ko' ? 'ko-KR' : 'en-US');
}

export function formatDateWithOptions(date: string, locale: Locale, options?: Intl.DateTimeFormatOptions): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long', 
    day: 'numeric'
  };
  
  return new Date(date).toLocaleDateString(
    locale === 'ko' ? 'ko-KR' : 'en-US',
    { ...defaultOptions, ...options }
  );
}