# Breadcrumb Component

![Screenshot](./screenshots/breadcrumb.png)

## TypeScript Props

```ts
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}
```

## ARIA Rationale

- `<nav aria-label="Breadcrumb">`: Gives the landmark a descriptive label so screen reader users understand its purpose.
- `aria-current="page"`: Applied to the final item in the breadcrumb sequence to indicate the user's current location within the hierarchy.
- `aria-hidden="true"`: Applied to the separators to hide decorative visual elements from screen readers.

## Usage Examples

### 1. Basic Usage

```tsx
import { Breadcrumb } from '@/components/ui/breadcrumb';

export default function Example() {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Shoes' },
  ];
  return <Breadcrumb items={items} />;
}
```

### 2. Custom Separator

```tsx
import { Breadcrumb } from '@/components/ui/breadcrumb';

export default function Example() {
  return (
    <Breadcrumb
      items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Settings' }]}
      separator={<span className="text-neutral-400">/</span>}
    />
  );
}
```

### 3. Deep Hierarchy

```tsx
import { Breadcrumb } from '@/components/ui/breadcrumb';

export default function Example() {
  const items = [
    { label: 'Store', href: '/store' },
    { label: 'Electronics', href: '/store/electronics' },
    { label: 'Laptops', href: '/store/electronics/laptops' },
    { label: 'MacBook Pro' },
  ];
  return <Breadcrumb items={items} />;
}
```
