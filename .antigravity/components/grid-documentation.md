# Grid Component

![Screenshot](./screenshots/grid.png)

## Overview

A generic grid layout component that provides a standardized column and gap system.

## Props

- `cols`: (Optional) Number of columns from `1` to `12`. Defaults to `1`.
- `gap`: (Optional) Gap spacing: `'none' | 'sm' | 'md' | 'lg' | 'xl'`. Defaults to `'md'`.
- `as`: (Optional) The underlying element to render (e.g., `'div'`, `'ul'`). Defaults to `'div'`.

## Usage Examples

### 1. Basic 3-column Grid

```tsx
import { Grid } from '@/components/ui/grid';

export function Example1() {
  return (
    <Grid cols={3} gap="lg">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </Grid>
  );
}
```

### 2. Polymorphic Grid as a List

```tsx
import { Grid } from '@/components/ui/grid';

export function Example2() {
  return (
    <Grid as="ul" cols={2} gap="sm">
      <li>List Item 1</li>
      <li>List Item 2</li>
    </Grid>
  );
}
```

### 3. Responsive Overrides

```tsx
import { Grid } from '@/components/ui/grid';

export function Example3() {
  return (
    <Grid cols={1} className="md:grid-cols-2 lg:grid-cols-4" gap="md">
      <div>Responsive Item 1</div>
      <div>Responsive Item 2</div>
      <div>Responsive Item 3</div>
      <div>Responsive Item 4</div>
    </Grid>
  );
}
```
