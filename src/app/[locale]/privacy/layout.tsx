import { Metadata } from 'next';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Privacy Policy | Coday',
  description: 'Privacy Policy and Cookie Settings for Coday.',
  robots: { index: false, follow: false },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
