const http = require('http');

const ports = [
  ...Array.from({ length: 10 }, (_, i) => 3000 + i),
  ...Array.from({ length: 10 }, (_, i) => 4173 + i),
  ...Array.from({ length: 10 }, (_, i) => 5173 + i),
];

function checkPort(port) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${port}`, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        // Check for dev server signature
        if (data.includes('src="/src/index.tsx"') || data.includes('type="module"')) {
          resolve({ port, type: 'dev' });
        } else {
          resolve({ port, type: 'prod' });
        }
      });
    });
    req.on('error', () => resolve(null));
    req.setTimeout(1000, () => {
      req.destroy();
      resolve(null);
    });
  });
}

async function scan() {
  console.log('Scanning ports...');
  for (const port of ports) {
    const result = await checkPort(port);
    if (result) {
      console.log(`Found server on port ${result.port} (${result.type})`);
      if (result.type === 'dev') {
        console.log(`DEV SERVER FOUND: ${result.port}`);
        // exit with success
      }
    }
  }
}

scan();
