# Navbar Component

![Screenshot](./screenshots/navbar.png)

## TypeScript Props

```ts
export interface NavItem {
  label: string;
  href: string;
}

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  items: NavItem[];
}
```

## ARIA Rationale

- `<nav aria-label="Main Navigation">`: Gives the navigation region a descriptive label so it is easily identifiable to screen readers.
- `aria-expanded` and `aria-controls`: Placed on the mobile menu toggle button to announce whether the menu is open or closed and to link it programmatically to the dropdown menu.
- `<header>`: Used as the semantic container for the logo and primary navigation.

## Usage Examples

### 1. Basic Usage

```tsx
import { Navbar } from '@/components/layout/navbar';

export default function Example() {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];
  return <Navbar items={items} />;
}
```

### 2. Custom Logo

```tsx
import { Navbar } from '@/components/layout/navbar';
import Image from 'next/image';

export default function Example() {
  const items = [{ label: 'Services', href: '/services' }];
  const logo = <Image src="/logo.svg" alt="Company Logo" width={120} height={40} />;

  return <Navbar logo={logo} items={items} />;
}
```

### 3. Styled Instance

```tsx
import { Navbar } from '@/components/layout/navbar';

export default function Example() {
  const items = [
    { label: 'Pricing', href: '/pricing' },
    { label: 'Docs', href: '/docs' },
  ];
  return <Navbar items={items} className="shadow-sm sticky top-0" />;
}
```
