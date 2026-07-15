import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Navigation Test',
  description: 'Navigation Test page',
  robots: { index: false, follow: false },
};

export default function NavTestLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
