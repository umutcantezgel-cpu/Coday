import { describe, it, expect } from 'vitest';
import { GET } from '@/app/llms.txt/route';
import { HESSEN_HUB, LOCATION_GROUPS } from '@/features/local-seo/model/locationLinks';

const BASE_URL = 'https://www.codayweb.de';

describe('llms.txt', () => {
  it('serves plain text with a Standorte section that lists every location page', async () => {
    const response = await GET();
    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toContain('text/plain');

    const text = await response.text();
    expect(text).toContain('## Standorte');
    expect(text).toContain(`${BASE_URL}/de/standorte/hessen`);

    const hrefs = new Set([
      HESSEN_HUB.href,
      ...LOCATION_GROUPS.flatMap((group) => group.links.map((link) => link.href)),
    ]);
    expect(hrefs.size).toBe(38);
    for (const href of hrefs) {
      expect(text, href).toContain(`${BASE_URL}/de${href}`);
    }
  });

  it('labels the location pages in German and keeps one line per page', async () => {
    const text = await (await GET()).text();

    // Group headings and labels come from the German common messages
    expect(text).toContain('### Rhein-Main & Taunus');
    expect(text).toContain('### 13 Landkreis-Hubs');
    expect(text).toContain(`- [Webdesign Frankfurt](${BASE_URL}/de/webdesign-frankfurt): `);
    expect(text).toContain(`- [Webdesign Landkreis Kassel](${BASE_URL}/de/regionen/landkreis-kassel)`);

    // The hub opens the section once and is not repeated inside its group
    const hubLines = text.split('\n').filter((line) => line.includes('/de/standorte/hessen'));
    expect(hubLines).toHaveLength(1);
    expect(hubLines[0]).toContain('- [Webdesign Hessen]');

    // The section sits between the case studies and the knowledge base
    expect(text.indexOf('## Standorte')).toBeGreaterThan(text.indexOf('## Case Studies'));
    expect(text.indexOf('## Standorte')).toBeLessThan(text.indexOf('## Knowledge Base'));
  });
});
