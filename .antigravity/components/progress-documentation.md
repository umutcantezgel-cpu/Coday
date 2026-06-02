# Progress Component Documentation

![Screenshot](./screenshots/progress.png)

## Overview

The `Progress` component is a horizontal bar that visually represents the completion status of a task. It ensures smooth, layout-shift-free animations by relying solely on `transform: scaleX(...)` rather than manipulating `width`. It adheres strictly to ARIA standards, exposing `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`.

## Interfaces & Types

```typescript
export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The current progress value (0 to 100).
   * @default 0
   */
  value?: number;
  /**
   * The maximum progress value.
   * @default 100
   */
  max?: number;
}
```

## Practical Usage Examples

### 1. Basic Progress Bar

A simple deterministic progress bar showing a static value.

```tsx
import { Progress } from '@/components/ui/progress';

export function BasicProgressExample() {
  return (
    <div className="w-full max-w-md">
      <Progress value={65} aria-label="Uploading file" />
    </div>
  );
}
```

### 2. Animated Task Progress

Progress bar that updates based on a state (e.g., simulating a download).

```tsx
import { Progress } from '@/components/ui/progress';
import { useState, useEffect } from 'react';

export function AnimatedProgressExample() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 10));
    }, 500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-md space-y-2">
      <label className="text-sm font-medium">Downloading assets...</label>
      <Progress value={progress} />
      <p className="text-xs text-neutral-500 text-right">{progress}%</p>
    </div>
  );
}
```

### 3. Custom Maximum Value

A progress bar measuring out of a specific limit, like steps completed.

```tsx
import { Progress } from '@/components/ui/progress';

export function StepsProgressExample() {
  const currentStep = 2;
  const totalSteps = 5;

  return (
    <div className="w-full max-w-md">
      <p className="mb-2 text-sm">
        Step {currentStep} of {totalSteps}
      </p>
      <Progress value={currentStep} max={totalSteps} />
    </div>
  );
}
```
