module.exports = {
    contextSeparator: '_',
    createOldCatalogs: false, // Save backup of old catalogs
    defaultNamespace: 'common',
    defaultValue: '__MISSING__',
    indentation: 2,
    keepRemoved: true, // Keep keys that are no longer in code (safety)
    keySeparator: '.',
    lexers: {
        js: ['JsxLexer'],
        jsx: ['JsxLexer'],
        ts: ['JsxLexer'],
        tsx: ['JsxLexer'],
        default: ['JsxLexer'],
    },
    lineEnding: 'auto',
    locales: ['de', 'en'],
    namespaceSeparator: ':',
    output: 'public/locales/$LOCALE/$NAMESPACE.json',
    input: ['src/**/*.{js,jsx,ts,tsx}'],
    reactNamespace: false,
    sort: true,
    useKeysAsDefaultValue: false,
    verbose: true,
    // Custom detection for useTranslation hook
    // We want to detect t('key') and useTranslation('ns')
};
