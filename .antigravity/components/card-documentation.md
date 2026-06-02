# Card Component

![Screenshot](./screenshots/card.png)

## Overview

A flexible, generic card component that can render as any HTML element. Implements the Emil Kowalski design philosophy for interaction states and shadows.

## Props

- `as`: (Optional) The underlying element to render (e.g., `'div'`, `'a'`, `'article'`). Defaults to `'div'`.
- `interactive`: (Optional) Boolean. Enables focus, hover styles, and keyboard accessibility (`Enter` and `Space` to click, preventing scroll on Space).
- `padding`: (Optional) `'none' | 'sm' | 'md' | 'lg'`. Defaults to `'md'`.

## Usage Examples

### 1. Basic Static Card

```tsx
import { Card } from '@/components/ui/card';

export function Example1() {
  return (
    <Card padding="lg">
      <h3 className="text-xl font-bold">Static Content</h3>
      <p>This is a non-interactive card.</p>
    </Card>
  );
}
```

### 2. Interactive Clickable Card

```tsx
import { Card } from '@/components/ui/card';

export function Example2() {
  const handleClick = () => alert('Card clicked!');

  return (
    <Card interactive onClick={handleClick}>
      <h3 className="text-xl font-bold">Click Me</h3>
      <p>Supports hover effects and keyboard navigation (Enter/Space).</p>
    </Card>
  );
}
```

### 3. Polymorphic Card as an Anchor link

```tsx
import { Card } from '@/components/ui/card';

export function Example3() {
  return (
    <Card as="a" href="/about" interactive padding="sm" className="block">
      <h3 className="text-xl font-bold">Go to About Page</h3>
      <p>This card renders as an <a> element.</p>
    </Card>
  );
}
```
