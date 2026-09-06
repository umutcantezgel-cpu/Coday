/**
 * Production stub for `next/dist/client/dev/hot-reloader/app/hot-reloader-app`.
 *
 * app-router.js mounts `<HotReloader>` and fetch-server-response.js awaits
 * `waitForWebpackRuntimeHotUpdate()` only behind
 * `process.env.NODE_ENV !== 'production'`. The default export renders its
 * children unchanged; the wait resolves immediately.
 */
Object.defineProperty(exports, '__esModule', { value: true });

function HotReload(props) {
  return props && props.children !== undefined ? props.children : null;
}

exports.default = HotReload;
exports.waitForWebpackRuntimeHotUpdate = () => Promise.resolve();
