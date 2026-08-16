import { permanentRedirect } from 'next/navigation';

export default async function PublicSectorLegacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  permanentRedirect(`/${locale}/branchen/public-sector`);
}
