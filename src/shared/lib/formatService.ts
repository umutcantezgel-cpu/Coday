import i18n from '@/i18n';

/**
 * The Weltenbürger Format Service
 * Wraps the native Intl API to provide consistent, locale-aware formatting across the application.
 */
export const FormatService = {
  /**
   * Get the current language from i18n instance or fallback to 'de-DE'
   */
  get locale(): string {
    return i18n.language || 'de-DE';
  },

  /**
   * Format a number based on the current locale
   * @param value The number to format
   * @param options Intl.NumberFormatOptions
   */
  number(value: number, options?: Intl.NumberFormatOptions): string {
    return new Intl.NumberFormat(this.locale, options).format(value);
  },

  /**
   * Format currency
   * @param value Amount
   * @param currency Currency code (default: EUR for de, USD for en)
   */
  currency(value: number, currency?: string): string {
    // Determine default currency based on language if not provided
    const defaultCurrency = this.locale.startsWith('en') ? 'USD' : 'EUR';
    const curr = currency || defaultCurrency;

    return new Intl.NumberFormat(this.locale, {
      style: 'currency',
      currency: curr,
    }).format(value);
  },

  /**
   * Format date
   * @param date Date object, timestamp, or string
   * @param options Intl.DateTimeFormatOptions
   */
  date(
    date: Date | string | number,
    options: Intl.DateTimeFormatOptions = { dateStyle: 'medium' }
  ): string {
    const d = new Date(date);
    return new Intl.DateTimeFormat(this.locale, options).format(d);
  },

  /**
   * Format relative time (e.g., "in 2 days", "vor 5 Minuten")
   * @param value Number of units
   * @param unit Unit (day, hour, minute, etc.)
   */
  relativeTime(value: number, unit: Intl.RelativeTimeFormatUnit): string {
    return new Intl.RelativeTimeFormat(this.locale, { numeric: 'auto' }).format(value, unit);
  },

  /**
   * Format a list of items (e.g., "A, B und C")
   * @param list Array of strings
   * @param type 'conjunction' (and), 'disjunction' (or), 'unit'
   */
  list(list: string[], type: Intl.ListFormatType = 'conjunction'): string {
    return new Intl.ListFormat(this.locale, { style: 'long', type }).format(list);
  },
};
