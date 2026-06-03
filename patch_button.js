const fs = require('fs');
let code = fs.readFileSync('src/components/ui/button.tsx', 'utf8');

code = code.replace(
  /const baseButtonStyles =[\s\S]*?;/,
  "const baseButtonStyles =\n  'relative inline-flex items-center justify-center rounded-xl font-medium outline-none focus-visible:ring-2 focus-visible:ring-action-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transition-[transform,opacity,filter,box-shadow,background-color] duration-300 ease-spring motion-reduce:transition-none active:scale-[0.97] touch-manipulation isolate';"
);

code = code.replace(
  /const buttonVariants: Record<string, string> = {[\s\S]*?};/,
  `const buttonVariants: Record<string, string> = {
  primary:
    'bg-action-primary text-content-inverse shadow-sm border border-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:bg-action-primary-hover [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-md',
  secondary:
    'bg-action-secondary text-content-inverse shadow-sm border border-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:bg-action-secondary-hover [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-md',
  outline:
    'bg-transparent border-2 border-action-primary text-action-primary [@media(hover:hover)_and_(pointer:fine)]:hover:bg-surface-muted',
  ghost:
    'bg-transparent border-transparent text-content-muted [@media(hover:hover)_and_(pointer:fine)]:hover:bg-surface-muted [@media(hover:hover)_and_(pointer:fine)]:hover:text-content-base',
};`
);

code = code.replaceAll(
  'transition-[opacity,transform] duration-150 ease-appear',
  'transition-[opacity,transform,filter] duration-300 ease-spring'
);

code = code.replace(/text-green-500/g, 'text-success-base');
code = code.replace(/text-red-500/g, 'text-danger-base');

fs.writeFileSync('src/components/ui/button.tsx', code);
