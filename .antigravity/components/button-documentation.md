# Button Component

![Screenshot](./screenshots/button.png)

## Overview

The Button component is a core primitive for interactive elements. It follows the design engineering principles of responsive interactions, accessible states, and elegant animation durations.

## Philosophy

- **Taste is trained**: Animations have been finely tuned (150ms `ease-out`) to provide instant feedback without feeling sluggish.
- **Interactivity**: Active states scale down to `0.97` to confirm the press action.
- **Accessibility**: Minimum size is 44px for adequate tap targets on touch devices. Ensure the button's purpose is clear through labels or `aria-label` when using icon-only versions.

## Usage

```tsx
import { Button } from '@/components/ui/button';
import { Play } from '@phosphor-icons/react/dist/ssr';

// Standard Usage
<Button variant="primary" size="md">Click Me</Button>

// With Icons and Loading State
<Button leftIcon={<Play />} isLoading>Watch Now</Button>

// Success State Feedback
<Button state="success">Saved Successfully</Button>
```

## Props

- `variant`: `primary`, `secondary`, `outline`, `ghost`
- `size`: `sm`, `md`, `lg`, `icon`, `xl`
- `state`: `idle`, `loading`, `success`, `error`
- `leftIcon`, `rightIcon`: React nodes for icons.
