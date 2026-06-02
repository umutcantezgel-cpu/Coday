# Alert Component Documentation

![Screenshot](./screenshots/alert.png)

## Overview

The `Alert` component is used to display important messages to the user. It adheres to the `emil-design-eng` design philosophy, ensuring smooth entry animations via `@starting-style` (using `opacity` and `scale`), strictly hardware-accelerated transforms without layout shifts, and minimum 44x44px tap targets for interactive elements (like the dismiss button). It fully supports ARIA roles (`role="alert"`).

## Interfaces & Types

```typescript
export type AlertVariant = 'default' | 'destructive' | 'success';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The variant style of the alert.
   * @default 'default'
   */
  variant?: AlertVariant;
  /**
   * Optional callback when the alert is dismissed.
   * If provided, a dismiss button will be rendered.
   */
  onDismiss?: () => void;
}
```

## Practical Usage Examples

### 1. Default Alert

Used for general information or neutral messages.

```tsx
import { Alert } from '@/components/ui/alert';

export function DefaultAlertExample() {
  return (
    <Alert>
      <strong>Update available!</strong> Please refresh to see the latest changes.
    </Alert>
  );
}
```

### 2. Destructive Alert with Dismiss

Used for error messages or critical warnings, with a dismissable action.

```tsx
import { Alert } from '@/components/ui/alert';
import { useState } from 'react';

export function DestructiveAlertExample() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <Alert variant="destructive" onDismiss={() => setIsVisible(false)}>
      <strong>Error:</strong> Failed to save your changes. Please try again.
    </Alert>
  );
}
```

### 3. Success Alert

Used to indicate a successful operation.

```tsx
import { Alert } from '@/components/ui/alert';

export function SuccessAlertExample() {
  return <Alert variant="success">Your profile has been updated successfully!</Alert>;
}
```
