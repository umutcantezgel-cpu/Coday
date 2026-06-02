# Skeleton Component Documentation

![Screenshot](./screenshots/skeleton.png)

## Overview

The `Skeleton` component is a placeholder shown to users while content is loading asynchronously. The updated version implements a fully hardware-accelerated shimmer effect using `transform: translateX` within an `after:` pseudo-element, avoiding the performance penalties of animating `background-position`. It also enforces a11y compliance by utilizing `role="status"` and `aria-hidden="true"`.

## Interfaces & Types

```typescript
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional custom class names for the skeleton.
   */
  className?: string;
}
```

## Practical Usage Examples

### 1. Block Text Placeholder

Used to simulate blocks of text loading.

```tsx
import { Skeleton } from '@/components/ui/skeleton';

export function TextSkeletonExample() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
      <Skeleton className="h-4 w-[220px]" />
    </div>
  );
}
```

### 2. User Profile Card Skeleton

Combining circular and rectangular skeletons to represent a user card.

```tsx
import { Skeleton } from '@/components/ui/skeleton';

export function ProfileCardSkeleton() {
  return (
    <div className="flex items-center space-x-4 p-4 border rounded-xl shadow-sm">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-3 w-[100px]" />
      </div>
    </div>
  );
}
```

### 3. Large Image Skeleton

A placeholder for hero images or large media elements.

```tsx
import { Skeleton } from '@/components/ui/skeleton';

export function ImageSkeletonExample() {
  return (
    <div className="w-full">
      <Skeleton className="h-64 w-full rounded-2xl" />
    </div>
  );
}
```
