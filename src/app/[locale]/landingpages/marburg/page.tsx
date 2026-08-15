import WebdesignMarburgPage, {
  generateMetadata as marburgMetadata,
} from '@/app/[locale]/webdesign-marburg/page';

export const dynamic = 'force-static';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  return marburgMetadata(props);
}

export default WebdesignMarburgPage;
