import WebdesignWeilburgPage, {
  generateMetadata as weilburgMetadata,
} from '@/app/[locale]/webdesign-weilburg/page';

export const dynamic = 'force-static';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  return weilburgMetadata(props);
}

export default WebdesignWeilburgPage;
