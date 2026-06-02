# Tooltip Component Documentation

![Screenshot](./screenshots/tooltip.png)

The Tooltip component displays brief information on hover or focus. It implements a global state to allow instant appearing of subsequent tooltips once the first one is visible, as per the design engineering standard.

## Accessibility

- Triggers on both `mouseenter` and `focus`.
- Dismisses on `mouseleave` and `blur`.
- Includes `role="tooltip"`.

## Usage Examples

### 1. Basic Tooltip

```tsx
import { Tooltip } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

export function BasicTooltipExample() {
  return (
    <Tooltip content="Add a new item to the list">
      <Button variant="outline">Add Item</Button>
    </Tooltip>
  );
}
```

### 2. Group of Tooltips (Demonstrates instant hover)

```tsx
import { Tooltip } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Copy, Trash, PencilSimple } from '@phosphor-icons/react/dist/ssr';

export function ToolbarExample() {
  return (
    <div className="flex items-center gap-2 rounded-lg border p-1 shadow-sm w-fit">
      <Tooltip content="Edit">
        <Button size="icon" variant="ghost">
          <PencilSimple className="h-4 w-4" />
        </Button>
      </Tooltip>
      <Tooltip content="Duplicate">
        <Button size="icon" variant="ghost">
          <Copy className="h-4 w-4" />
        </Button>
      </Tooltip>
      <Tooltip content="Delete">
        <Button
          size="icon"
          variant="ghost"
          className="text-red-500 hover:text-red-600 hover:bg-red-50"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </Tooltip>
    </div>
  );
}
```

### 3. Positioned Tooltips

```tsx
import { Tooltip } from '@/components/ui/tooltip';

export function PositionedTooltipExample() {
  return (
    <div className="flex gap-4 p-8">
      <Tooltip content="Tooltip on top" position="top">
        <span className="underline decoration-dotted cursor-help">Hover me (Top)</span>
      </Tooltip>
      <Tooltip content="Tooltip on right" position="right">
        <span className="underline decoration-dotted cursor-help">Hover me (Right)</span>
      </Tooltip>
      <Tooltip content="Tooltip on bottom" position="bottom">
        <span className="underline decoration-dotted cursor-help">Hover me (Bottom)</span>
      </Tooltip>
    </div>
  );
}
```
