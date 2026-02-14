/**
 * Format a number as currency.
 * @param amount The number to format.
 * @param currency The currency code (default: 'EUR').
 * @param locale The locale to use (default: 'de-DE').
 */
export const formatCurrency = (amount: number, currency: string = 'EUR', locale?: string) => {
  // If no locale is provided, try to use document.documentElement.lang, fallback to 'de-DE'
  const currentLocale = locale
    ? locale
    : (typeof document !== 'undefined' && document.documentElement.lang) || 'de-DE';

  return new Intl.NumberFormat(currentLocale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format a number with locale-specific separators.
 * @param number The number to format.
 * @param locale The locale to use.
 * @param options Intl.NumberFormatOptions
 */
export const formatNumber = (
  number: number,
  locale?: string,
  options?: Intl.NumberFormatOptions
) => {
  const currentLocale = locale
    ? locale
    : (typeof document !== 'undefined' && document.documentElement.lang) || 'de-DE';

  return new Intl.NumberFormat(currentLocale, options).format(number);
};

/**
 * Format a date.
 * @param date The date to format (Date object or timestamp number or string).
 * @param locale The locale to use.
 * @param options Intl.DateTimeFormatOptions
 */
export const formatDate = (
  date: Date | number | string,
  locale?: string,
  options: Intl.DateTimeFormatOptions = { dateStyle: 'medium' }
) => {
  const currentLocale = locale
    ? locale
    : (typeof document !== 'undefined' && document.documentElement.lang) || 'de-DE';

  const d = new Date(date);
  return new Intl.DateTimeFormat(currentLocale, options).format(d);
};

/**
 * Format a list of items using Intl.ListFormat.
 * @param list The array of strings to format.
 * @param locale The locale to use.
 * @param options Intl.ListFormatOptions
 */
export const formatList = (list: string[], locale?: string, options?: Intl.ListFormatOptions) => {
  const currentLocale = locale
    ? locale
    : (typeof document !== 'undefined' && document.documentElement.lang) || 'de-DE';

  try {
    return new Intl.ListFormat(currentLocale, options).format(list);
  } catch {
    // Fallback
    return list.join(', ');
  }
};
