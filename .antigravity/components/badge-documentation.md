# Badge Component

![Screenshot](./screenshots/badge.png)

## Overview

The Badge component is used to display status, labels, or short contextual information. It can function as a static label or an interactive element.

## Philosophy

- **Accessibility First**: When interactive, it enforces a minimum tap target of `44x44px` conforming to modern a11y guidelines.
- **Responsive Interactions**: When `interactive` is true, the Badge gains focus styles, hover effects, and a `0.97` active scale state for immediate press feedback.

## Usage

```tsx
import { Badge } from '@/components/ui/badge';

// Standard Usage
<Badge>New</Badge>

// Success Variant
<Badge variant="success">Completed</Badge>

// Interactive Usage
<Badge interactive onClick={() => console.log('Dismissed')}>Dismiss</Badge>
```

## Props

- `variant`: `primary`, `secondary`, `outline`, `success`, `warning`, `error`
- `interactive`: Boolean that toggles interactive styles (button semantics, `44x44px` min target, active states).
