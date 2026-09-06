/**
 * Production stub for
 * `next/dist/next-devtools/userspace/app/errors/use-error-handler`.
 *
 * Global error / rejection listeners feeding the dev overlay. Only reached
 * behind `process.env.NODE_ENV !== 'production'`; every export is a no-op.
 */
const noop = () => {};

Object.defineProperty(exports, '__esModule', { value: true });

exports.handleClientError = noop;
exports.handleConsoleError = noop;
exports.handleGlobalErrors = noop;
exports.useErrorHandler = noop;
