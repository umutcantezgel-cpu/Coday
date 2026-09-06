/**
 * Production stub for `next/dist/client/dev/hot-reloader/shared`.
 *
 * Fast Refresh full-reload messages and the invalid-HMR-message reporter.
 * The constants keep their literal values; the reporter is a no-op.
 */
Object.defineProperty(exports, '__esModule', { value: true });

exports.REACT_REFRESH_FULL_RELOAD =
  '[Fast Refresh] performing full reload\n\n' +
  "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" +
  'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' +
  'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' +
  'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' +
  'Fast Refresh requires at least one parent function component in your React tree.';
exports.REACT_REFRESH_FULL_RELOAD_FROM_ERROR =
  '[Fast Refresh] performing full reload because your application had an unrecoverable error';
exports.reportInvalidHmrMessage = () => {};
