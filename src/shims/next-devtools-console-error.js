/**
 * Production stub for `next/dist/next-devtools/shared/console-error`.
 *
 * Tags errors that came from `console.error` so the dev overlay can tell
 * them apart. Only used by the dev-only error handler; the stub keeps the
 * same shape (create returns an Error, the predicate is always false).
 */
Object.defineProperty(exports, '__esModule', { value: true });

exports.createConsoleError = (message) =>
  typeof message === 'string' ? new Error(message) : message;
exports.isConsoleError = () => false;
