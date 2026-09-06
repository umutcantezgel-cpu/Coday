/**
 * Production stub for `next/dist/next-devtools/userspace/app/errors` (index).
 *
 * error-boundary-callbacks.js requires this barrel in a top-level
 * `process.env.NODE_ENV !== 'production' ? require(...) : {...}` ternary and
 * falls back to exactly these shapes in production: identity decorate, no-op
 * client error handler, the original console.error.
 */
Object.defineProperty(exports, '__esModule', { value: true });

exports.decorateDevError = (error) => error;
exports.handleClientError = () => {};
exports.originConsoleError = (...args) => console.error(...args);
