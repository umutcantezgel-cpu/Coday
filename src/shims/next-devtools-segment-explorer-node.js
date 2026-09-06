/**
 * Production stub for
 * `next/dist/next-devtools/userspace/app/segment-explorer-node`.
 *
 * The segment explorer nodes are rendered by layout-router only behind
 * `process.env.NODE_ENV !== 'production'`. Marker components render
 * nothing, wrapper components render their children unchanged, and the
 * simulated-error message keeps its literal value so the comparison in
 * error-boundary-callbacks stays correct.
 */
Object.defineProperty(exports, '__esModule', { value: true });

const SEGMENT_STATE = { boundaryType: null, setBoundaryType: () => {} };

function renderChildren(props) {
  return props && props.children !== undefined ? props.children : null;
}

exports.SEGMENT_EXPLORER_SIMULATED_ERROR_MESSAGE = 'NEXT_DEVTOOLS_SIMULATED_ERROR';
exports.SegmentBoundaryTriggerNode = () => null;
exports.SegmentStateProvider = renderChildren;
exports.SegmentViewNode = renderChildren;
exports.SegmentViewStateNode = () => null;
exports.useSegmentState = () => SEGMENT_STATE;
