module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run start',
      startServerReadyPattern: 'ready on|started server on|Local:|http://localhost:3000',
      startServerReadyTimeout: 60000,
      url: ['http://localhost:3000/de'],
      numberOfRuns: 1,
      settings: {
        chromeFlags: '--no-sandbox --headless --disable-gpu --disable-dev-shm-usage',
        onlyCategories: ['accessibility', 'best-practices', 'performance', 'seo'],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      assertions: {
        'categories:accessibility': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
        'categories:performance': ['warn', { minScore: 0.7 }],
      },
    },
  },
};
