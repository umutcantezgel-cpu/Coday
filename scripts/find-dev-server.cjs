
const http = require('http');

const ports = [];
for (let i = 0; i < 10; i++) ports.push(3000 + i);
for (let i = 0; i < 10; i++) ports.push(4173 + i);
for (let i = 0; i < 10; i++) ports.push(5173 + i);

function checkPort(port) {
    return new Promise((resolve) => {
        const req = http.get(`http://localhost:${port}`, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                // Check for dev server signature
                // React/Vite dev usually has src="/src/main.tsx" or similar
                // Check for dev server signature
                const isDev = data.includes('src="/src/') || data.includes('src="/@fs/');
                const isProd = data.includes('src="/assets/');

                const type = isDev ? 'DEV' : (isProd ? 'PROD' : 'UNKNOWN');

                // Extract script src for debugging
                const match = data.match(/src="([^"]+)"/);
                const src = match ? match[1] : 'no-script-src';

                resolve({ port, type, src });
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
        }
    }
}

scan();
