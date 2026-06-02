# Icon Component

![Screenshot](./screenshots/icon.png)

## Overview

The Icon component standardizes the use of `@phosphor-icons/react` across the application. It acts as a wrapper that forces consistent sizing and accessibility best practices.

## Philosophy

- **Built-in Accessibility**: Icons are decorative by default (`aria-hidden="true"`). If an `aria-label` is provided, the icon is assigned `role="img"` to ensure screen readers announce its meaning.
- **Consistency**: The `h-5 w-5 shrink-0` class ensures consistent baseline alignment and prevents icon squishing in flex containers.

## Usage

```tsx
import { Icon } from '@/components/ui/icon';
import { CheckCircle, MagnifyingGlass, WarningCircle } from '@phosphor-icons/react/dist/ssr';

// Decorative Icon (Hidden from screen readers)
<Icon icon={CheckCircle} />

// Meaningful Icon with Accessibility Label
<Icon icon={MagnifyingGlass} aria-label="Search" />

// Styled Icon with Custom Size and Color
<Icon icon={WarningCircle} className="h-6 w-6 text-red-500" weight="fill" />
```

## Props

- `icon`: The Phosphor icon component to render.
- `aria-label`: String to provide an accessible name for meaning-bearing icons.
- ...all other Phosphor Icon props (`size`, `weight`, `color`, `className`).
