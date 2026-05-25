
import { draftMode } from 'next/headers';
import 'server-only';
import { client } from './client';

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
}): Promise<QueryResponse> {
  const isDraftMode = (await draftMode()).isEnabled;

  if (isDraftMode && !process.env.SANITY_API_READ_TOKEN) {
    console.warn('SANITY_API_READ_TOKEN is not set for draft mode.');
  }

  const next: RequestInit['next'] = isDraftMode
    ? { revalidate: 0 }
    : { tags, revalidate: 3600 };

  return client.fetch<QueryResponse>(query, params, {
    ...(isDraftMode && {
      token: process.env.SANITY_API_READ_TOKEN,
      perspective: 'previewDrafts',
      useCdn: false,
    }),
    next,
  });
}
