# Input Component

![Screenshot](./screenshots/input.png)

## Overview

The Input component provides a text field with support for floating labels, helper text, inline icons, and state feedback.

## Philosophy

- **Responsive Interactions**: The floating label transitions and error message appearances use a 150ms `ease-out` for snappy visual updates.
- **Accessibility**: ARIA attributes `aria-invalid` and `aria-describedby` are automatically wired to helper/error texts for proper screen reader announcements.
- **Visual Feedback**: Shake animations on errors draw immediate attention.

## Usage

```tsx
import { Input } from '@/components/ui/input';
import { Envelope } from '@phosphor-icons/react/dist/ssr';

// Standard Usage
<Input label="Email" placeholder="you@example.com" />

// With Error State and Icons
<Input label="Email" error="Invalid email address" leftIcon={<Envelope />} />

// With Helper Text
<Input label="Username" helperText="You can change this later." />
```

## Props

- `label`: Floating label string.
- `error`: Error message text.
- `helperText`: Additional description text.
- `leftIcon`, `rightIcon`: React nodes for inline icons.
