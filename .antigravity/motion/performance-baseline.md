# Performance Baseline Report

## Environment Details

- **Test URL**: http://localhost:3000
- **Mode**: Production build (`next build && next start`)
- **Date**: 2026-06-02

## Metrics Gathered via Puppeteer Trace

The following metrics were gathered by starting a Chrome performance trace, loading the page, and performing an automated scroll to trigger rendering and layout shifts.

- **Estimated FPS**: ~101.62
- **Layout Triggers**: 116
- **Total Layout Duration**: 45.66 ms
- **JS Heap Used Size**: 6.76 MB

## Observations

- The Next.js 15 App Router is extremely fast and layout triggers are minimal.
- Frame rate remains consistently high during scroll animations.
- Memory consumption (JS Heap) is very low at ~6.7 MB.
- GPU Memory metrics were not directly available via the `Performance.getMetrics` CDP method without native Chrome tracing, but given the 100+ FPS, there is no indication of GPU bottlenecking.
