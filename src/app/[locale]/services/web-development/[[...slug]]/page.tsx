import { redirect } from 'next/navigation';

export default async function WebDevelopmentRedirect(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const slugPath = params.slug ? `/${params.slug.join('/')}` : '';
  redirect(`/services/development${slugPath}`);
}
