/**
 * Production stub for `next/dist/compiled/next-devtools` (~820 kB).
 *
 * Next requires the dev overlay from several client modules
 * (client/components/layout-router, client/react-client-callbacks/*), each guarded
 * by `process.env.NODE_ENV !== 'production'`. Webpack keeps those requires anyway
 * and pulls the payload into `rootMainFiles`, i.e. the <head> of every route.
 *
 * The alias in next.config.ts swaps this stub in for the production client build
 * only — `next dev` still resolves the real overlay.
 */
const noop = () => {};

module.exports = {
  DevOverlayContext: { Provider: noop, Consumer: noop, displayName: 'DevOverlayContextStub' },
  dispatcher: new Proxy({}, { get: () => noop }),
  renderAppDevOverlay: noop,
  renderPagesDevOverlay: noop,
  useDevOverlayContext: () => ({}),
};
