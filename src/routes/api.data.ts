import { aiDataEndpoints } from '@/shared/data/ai-data-endpoints';

export async function loader({ params }: { params: { dataset: string; format: string } }) {
  const { dataset, format } = params;

  const data = aiDataEndpoints.find((d) => d.slug === dataset);

  if (!data) {
    return new Response(JSON.stringify({ error: 'Dataset not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Handle JSON
  if (format === 'json') {
    return new Response(JSON.stringify(data, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200',
      },
    });
  }

  // Handle CSV
  if (format === 'csv') {
    if (!data.sampleData || data.sampleData.length === 0) {
      return new Response('No data available', { status: 404 });
    }

    // Get headers
    // @ts-expect-error
    const headers = Object.keys(data.sampleData[0]).join(',');

    // Get rows
    const rows = data.sampleData.map((row) => {
      return Object.values(row)
        .map((val) => {
          // Simple escape for CSV
          if (typeof val === 'string' && (val.includes(',') || val.includes('"'))) {
            return `"${val.replace(/"/g, '""')}"`;
          }
          return val;
        })
        .join(',');
    });

    const csvContent = [headers, ...rows].join('\\n');

    return new Response(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${data.slug}.csv"`,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200',
      },
    });
  }

  return new Response(JSON.stringify({ error: "Invalid format. Use 'json' or 'csv'." }), {
    status: 400,
    headers: { 'Content-Type': 'application/json' },
  });
}
