/**
 * Production stub for
 * `next/dist/next-devtools/userspace/app/errors/stitched-error`.
 *
 * Owner-stack stitching for the dev overlay. Only reached behind
 * `process.env.NODE_ENV !== 'production'`; the stub passes errors through.
 */
Object.defineProperty(exports, '__esModule', { value: true });

exports.coerceError = (value) => (value instanceof Error ? value : new Error(String(value)));
exports.decorateDevError = (thrownValue) => thrownValue;
exports.getOwnerStack = () => undefined;
exports.setOwnerStack = () => {};
exports.setOwnerStackIfAvailable = () => {};
