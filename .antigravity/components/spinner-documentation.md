# Spinner Component Documentation

![Screenshot](./screenshots/spinner.png)

## Overview

The `Spinner` component provides a visual cue that a background operation is processing. It is implemented as a lightweight SVG relying strictly on `transform: rotate` and `linear` CSS easing, guaranteeing a 60fps hardware-accelerated animation. Accessibility is built-in with `role="status"` and `aria-label="Loading"`.

## Interfaces & Types

```typescript
export interface SpinnerProps extends React.SVGProps<SVGSVGElement> {
  /**
   * The size of the spinner in pixels or tailwind units.
   * @default 24
   */
  size?: number | string;
}
```

## Practical Usage Examples

### 1. Default Spinner

Basic spinner centered on the screen or inside a container.

```tsx
import { Spinner } from '@/components/ui/spinner';

export function BasicSpinnerExample() {
  return (
    <div className="flex justify-center p-4">
      <Spinner className="text-primary-600" />
    </div>
  );
}
```

### 2. Button with Loading State

Integrating the spinner inside a button when submitting a form.

```tsx
import { Spinner } from '@/components/ui/spinner';
import { useState } from 'react';

export function ButtonSpinnerExample() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <button
      disabled={isLoading}
      onClick={() => setIsLoading(true)}
      className="flex h-11 items-center justify-center gap-2 rounded-md bg-primary-600 px-4 py-2 text-white disabled:opacity-50"
    >
      {isLoading && <Spinner size={16} className="text-white" />}
      {isLoading ? 'Saving...' : 'Save Changes'}
    </button>
  );
}
```

### 3. Large Full-Page Loader

A larger spinner typically used when fetching initial data for a page route.

```tsx
import { Spinner } from '@/components/ui/spinner';

export function FullPageLoaderExample() {
  return (
    <div className="flex h-[400px] w-full items-center justify-center bg-neutral-50 dark:bg-neutral-900">
      <div className="flex flex-col items-center gap-4">
        <Spinner size={48} className="text-primary-600" />
        <p className="text-sm text-neutral-500">Loading resources...</p>
      </div>
    </div>
  );
}
```
