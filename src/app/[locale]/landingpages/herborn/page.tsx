import WebdesignHerbornPage, {
  generateMetadata as herbornMetadata,
} from '@/app/[locale]/webdesign-herborn/page';

export const dynamic = 'force-static';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  return herbornMetadata(props);
}

export default WebdesignHerbornPage;
