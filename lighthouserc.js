module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run start',
      startServerReadyPattern: 'ready on|started server on|Local:|http://localhost:3000',
      startServerReadyTimeout: 60000,
      url: ['http://localhost:3000/de'],
      numberOfRuns: 1,
      settings: {
        preset: 'desktop',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:accessibility': ['error', { minScore: 0.9 }],
      },
    },
  },
};
