import { BreadcrumbList, ListItem } from 'schema-dts';

export interface BreadcrumbInput {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbInput[]): BreadcrumbList | null {
  if (!items || items.length === 0) {
    return null;
  }

  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    }) as ListItem),
  };
}
