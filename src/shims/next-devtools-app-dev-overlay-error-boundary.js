/**
 * Production stub for
 * `next/dist/next-devtools/userspace/app/app-dev-overlay-error-boundary`.
 *
 * The real boundary wraps the app in the dev overlay's error UI; it is only
 * mounted behind `process.env.NODE_ENV !== 'production'`. The stub renders
 * its children unchanged.
 */
Object.defineProperty(exports, '__esModule', { value: true });

function AppDevOverlayErrorBoundary(props) {
  return props && props.children !== undefined ? props.children : null;
}

exports.AppDevOverlayErrorBoundary = AppDevOverlayErrorBoundary;
