
import { GLOSSARY_TERMS as GLOSSARY_TERMS_DE } from './glossary.de';
import { GLOSSARY_TERMS as GLOSSARY_TERMS_EN } from './glossary.en';

export const getGlossaryTerms = (locale: string = 'de'): Record<string, string> => {
    return locale === 'en' ? GLOSSARY_TERMS_EN : GLOSSARY_TERMS_DE;
};

// Default export for backwards compatibility
export const GLOSSARY_TERMS = GLOSSARY_TERMS_DE;
