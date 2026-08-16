import { permanentRedirect } from 'next/navigation';

export default async function GesundheitLegacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  permanentRedirect(`/${locale}/branchen/aerzte-gesundheit`);
}
