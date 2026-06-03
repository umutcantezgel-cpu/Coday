const fs = require('fs');
let code = fs.readFileSync('src/components/ui/badge.tsx', 'utf8');

code = code.replace(
  /const badgeVariants: Record<string, string> = {[\s\S]*?};/,
  `const badgeVariants: Record<string, string> = {
  primary: 'bg-action-primary text-content-inverse border-transparent',
  secondary: 'bg-surface-muted text-content-base border-transparent',
  outline: 'text-content-base border-border-base',
  success: 'bg-success-muted text-success-base border-transparent',
  warning: 'bg-warning-muted text-warning-base border-transparent',
  error: 'bg-danger-muted text-danger-base border-transparent',
};`
);

code = code.replace(
  /rounded-full/g,
  'rounded-lg'
);

code = code.replace(
  /duration-150 ease-out/g,
  'duration-300 ease-spring'
);

code = code.replace(
  /focus-visible:ring-primary/g,
  'focus-visible:ring-action-primary'
);

fs.writeFileSync('src/components/ui/badge.tsx', code);
