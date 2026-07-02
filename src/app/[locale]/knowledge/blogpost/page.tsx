import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

import { redirect } from 'next/navigation';

// Legacy route — redirect to the blog listing page
export default function BlogPostLegacyPage() {
  redirect('/knowledge/blog');
}
