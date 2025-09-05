import { Locale } from '@/i18n/request';

function toLangTag(locale: Locale): string {
  if (locale === 'ko') return 'ko-KR';
  if (locale === 'ja') return 'ja-JP';
  return 'en-US';
}

export function formatDate(date: string, locale: Locale): string {
  return new Date(date).toLocaleDateString(toLangTag(locale));
}

export function formatDateWithOptions(
    date: string,
    locale: Locale,
    options?: Intl.DateTimeFormatOptions
): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return new Date(date).toLocaleDateString(
      toLangTag(locale),
      { ...defaultOptions, ...options }
  );
}