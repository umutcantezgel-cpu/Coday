import WebdesignDillenburgPage, {
  generateMetadata as dillenburgMetadata,
} from '@/app/[locale]/webdesign-dillenburg/page';

export const dynamic = 'force-static';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  return dillenburgMetadata(props);
}

export default WebdesignDillenburgPage;
