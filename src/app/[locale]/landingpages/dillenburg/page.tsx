import { permanentRedirect } from 'next/navigation';

export default async function DillenburgLandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  permanentRedirect(`/${locale}/webdesign-dillenburg`);
}
