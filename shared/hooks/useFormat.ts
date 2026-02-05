import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

export const useFormat = () => {
    const { i18n } = useTranslation();
    const locale = i18n.language;

    const formatCurrency = useCallback((amount: number, currency = 'EUR') => {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency,
        }).format(amount);
    }, [locale]);

    const formatNumber = useCallback((number: number, options?: Intl.NumberFormatOptions) => {
        return new Intl.NumberFormat(locale, options).format(number);
    }, [locale]);

    const formatDate = useCallback((date: Date | number | string, options: Intl.DateTimeFormatOptions = {}) => {
        const d = new Date(date);
        return new Intl.DateTimeFormat(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            ...options
        }).format(d);
    }, [locale]);

    return {
        formatCurrency,
        formatNumber,
        formatDate,
        locale
    };
};
