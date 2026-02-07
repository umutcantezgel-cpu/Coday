import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-fs-backend';
import { resolve } from 'node:path';

export async function createI18n(lng: string) {
    const instance = i18n.createInstance();

    await instance
        .use(Backend)
        .use(initReactI18next)
        .init({
            lng,
            fallbackLng: 'de',
            supportedLngs: ['de', 'en'],
            debug: false,
            initImmediate: false,

            ns: [
                'common',
                'home',
                'blog',
                'form',
                'pricing',
                'process',
                'services',
                'tools',
                'work',
                'industries',
                'knowledge',
                'legal',
                'careers',
                'contact',
                'dashboard',
            ],
            defaultNS: 'common',

            interpolation: {
                escapeValue: false,
            },

            backend: {
                loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json'),
            },
        });

    return instance;
}
