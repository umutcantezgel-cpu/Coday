import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { pickMessages, ROOT_CLIENT_NAMESPACES, ROUTE_CLIENT_NAMESPACES } from './clientMessages';

type RouteFamily = keyof typeof ROUTE_CLIENT_NAMESPACES;

/**
 * Server component that re-provides the client message catalogue for one route
 * family: the root set plus that family's own namespaces. Wrap a route family's
 * children in this wherever its client components need more than `common`.
 */
export async function RouteMessages({
  family,
  locale,
  children,
}: {
  family: RouteFamily;
  locale: string;
  children: React.ReactNode;
}) {
  const messages = pickMessages(await getMessages(), [
    ...ROOT_CLIENT_NAMESPACES,
    ...ROUTE_CLIENT_NAMESPACES[family],
  ]);

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
}
