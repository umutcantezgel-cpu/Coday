/**
 * Production stub for `next/dist/next-devtools/shared/forward-logs-shared`.
 *
 * `patchConsoleMethod` wraps console methods for terminal log forwarding in
 * development. The stub leaves the console untouched and returns the same
 * "restore" function shape (a no-op).
 */
Object.defineProperty(exports, '__esModule', { value: true });

exports.UNDEFINED_MARKER = '__next_tagged_undefined';
exports.patchConsoleMethod = () => () => {};
