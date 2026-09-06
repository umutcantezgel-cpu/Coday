/**
 * Production stub for `next/dist/client/dev/hot-reloader/app/use-websocket`.
 *
 * HMR socket hooks. Never called in production; each hook returns a stable
 * inert value (a ref holding null, or a no-op sender).
 */
const noop = () => {};
const NULL_REF = { current: null };

Object.defineProperty(exports, '__esModule', { value: true });

exports.useSendMessage = () => noop;
exports.useTurbopack = () => noop;
exports.useWebsocket = () => NULL_REF;
exports.useWebsocketPing = noop;
