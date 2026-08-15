import WebdesignGiessenPage, {
  generateMetadata as giessenMetadata,
} from '@/app/[locale]/webdesign-giessen/page';

export const dynamic = 'force-static';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  return giessenMetadata(props);
}

export default WebdesignGiessenPage;
