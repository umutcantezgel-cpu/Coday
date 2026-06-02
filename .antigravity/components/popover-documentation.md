# Popover Component Documentation

![Screenshot](./screenshots/popover.png)

The Popover component displays rich content in a portal, triggered by a button. It supports custom origin animations and click-outside dismissal.

## Accessibility

- Automatically dismisses on `Escape` key.
- Closes on click outside.
- Uses `aria-haspopup` and `aria-expanded` on the trigger wrapper.

## Usage Examples

### 1. Basic Popover

```tsx
import { Popover } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

export function BasicPopoverExample() {
  return (
    <Popover
      trigger={<Button variant="outline">Open Popover</Button>}
      content={
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">Details</h4>
          <p className="text-sm text-gray-500">
            This is a simple popover with some additional information.
          </p>
        </div>
      }
    />
  );
}
```

### 2. Positioned Popover (Top End)

```tsx
import { Popover } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

export function PositionedPopoverExample() {
  return (
    <Popover
      position="top"
      align="end"
      trigger={<Button variant="ghost">Options</Button>}
      content={
        <ul className="flex flex-col gap-1 text-sm text-gray-700">
          <li className="cursor-pointer rounded-md px-2 py-1 hover:bg-gray-100">Settings</li>
          <li className="cursor-pointer rounded-md px-2 py-1 hover:bg-gray-100">Profile</li>
          <li className="cursor-pointer rounded-md px-2 py-1 text-red-600 hover:bg-red-50">
            Logout
          </li>
        </ul>
      }
    />
  );
}
```

### 3. Left Aligned Context Menu

```tsx
import { Popover } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

export function ContextMenuExample() {
  return (
    <Popover
      position="left"
      align="start"
      trigger={
        <Button size="icon" variant="ghost">
          ⋮
        </Button>
      }
      content={
        <div className="w-40 text-sm">
          <p className="font-semibold text-gray-900 mb-2">Actions</p>
          <div className="border-t border-gray-100 pt-2 flex flex-col gap-1">
            <button className="text-left px-2 py-1 hover:bg-gray-100 rounded">Duplicate</button>
            <button className="text-left px-2 py-1 hover:bg-gray-100 rounded">Archive</button>
          </div>
        </div>
      }
    />
  );
}
```
