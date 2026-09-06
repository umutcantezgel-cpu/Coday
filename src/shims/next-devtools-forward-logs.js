/**
 * Production stub for `next/dist/next-devtools/userspace/app/forward-logs`.
 *
 * Only reached behind `process.env.NODE_ENV !== 'production'` guards (browser
 * log forwarding to the dev terminal). Same named exports as the original;
 * every function is a no-op and `logQueue` accepts calls without sending.
 */
const noop = () => {};

const logQueue = {
  entries: [],
  flushScheduled: false,
  cancelFlush: null,
  socket: null,
  sourceType: undefined,
  router: null,
  scheduleLogSend: noop,
  onSocketReady: noop,
};

Object.defineProperty(exports, '__esModule', { value: true });

exports.PROMISE_MARKER = 'Promise {}';
exports.UNAVAILABLE_MARKER = '[Unable to view]';
exports.forwardErrorLog = noop;
exports.forwardUnhandledError = noop;
exports.initializeDebugLogForwarding = noop;
exports.isTerminalLoggingEnabled = false;
exports.logQueue = logQueue;
exports.logStringify = (value) => String(value);
exports.logUnhandledRejection = noop;
exports.preLogSerializationClone = (value) => value;
