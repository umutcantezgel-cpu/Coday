import { academyData } from '@/shared/data/academy';
import { BASE_URL } from '@/lib/schema';

export const dynamic = 'force-static';
export const revalidate = 86400; // 24 hours

export async function GET() {
  const locales = ['de', 'en'] as const;

  // Google expects ONE <url> per page with all its <video:video> children.
  // Duplicate <loc> blocks risk being deduplicated down to a single video.
  const urlEntries = locales.map((locale) => {
    const lang = locale === 'en' ? 'en' : 'de';
    const pageUrl = `${BASE_URL}/${locale}/knowledge/academy`;

    const videosXml = academyData
      .map((course) => {
        const thumbnailUrl = `${BASE_URL}${course.image}`;
        const contentUrl = `${BASE_URL}${course.videoSrc}`;
        const title = course.content[lang].title;
        const description = course.content[lang].description;
        const tagsXml = course.tags
          .slice(0, 5)
          .map((tag) => `      <video:tag><![CDATA[${tag}]]></video:tag>`)
          .join('\n');

        return `    <video:video>
      <video:thumbnail_loc>${thumbnailUrl}</video:thumbnail_loc>
      <video:title><![CDATA[${title}]]></video:title>
      <video:description><![CDATA[${description}]]></video:description>
      <video:content_loc>${contentUrl}</video:content_loc>
      <video:duration>${course.durationInSeconds}</video:duration>
      <video:publication_date>${course.uploadDate}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:requires_subscription>no</video:requires_subscription>
      <video:live>no</video:live>
${tagsXml}
      <video:uploader info="${BASE_URL}/${locale}/about">Coday Webagentur Wetzlar</video:uploader>
    </video:video>`;
      })
      .join('\n');

    return `  <url>
    <loc>${pageUrl}</loc>
${videosXml}
  </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urlEntries.join('\n')}
</urlset>`;

  return new Response(xml.trim(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
    },
  });
}
