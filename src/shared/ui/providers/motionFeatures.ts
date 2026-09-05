/**
 * The animation feature set, as a single default export.
 *
 * `MotionProvider` used to load it with `import('motion/react').then(m => m.domAnimation)`.
 * That is a dynamic import of the whole package namespace, and webpack cannot
 * tree-shake a namespace it has to keep intact for the `.then` callback — so the
 * lazy chunk shipped the full feature set: projection, drag, pan, layout
 * animations. Lighthouse measured 38.8 KiB transferred with 32.7 KiB of it
 * never executed.
 *
 * Re-exporting one binding gives the bundler a single traceable specifier, so
 * everything `domAnimation` does not reference can be dropped.
 *
 * `domAnimation` is the right set here: the site animates opacity, transform and
 * gesture states via `m.*`, and nothing uses `drag`, `<Reorder>` or shared
 * `layoutId` transitions on a route that loads this provider.
 */
export { domAnimation as default } from 'motion/react';
