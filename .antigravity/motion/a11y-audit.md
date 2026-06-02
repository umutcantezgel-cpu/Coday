# Accessibility (A11y) Audit Report

## Environment Details

- **Test URL**: http://localhost:3000
- **Tool Used**: Lighthouse (headless Chrome, navigation mode)
- **Date**: 2026-06-02

## Audit Summary

- **Overall Score**: 97 / 100

## Violations Found

### 1. Elements use prohibited ARIA attributes (`aria-prohibited-attr`)

**Description**: Using ARIA attributes in roles where they are prohibited can mean that important information is not communicated to users of assistive technologies. `aria-label` cannot be used on a `div` without a valid `role` attribute.

**Instances (3)**:

- Selector: `div.flex > div.transition-[transform,opacity] > div.relative > div.flex`
  Snippet: `<div class="flex gap-1 mb-8 text-yellow-500" aria-label="Bewertung: 5 von 5 Sternen">`
- Selector: `div.flex > div.transition-[transform,opacity] > div.relative > div.flex`
  Snippet: `<div class="flex gap-1 mb-8 text-yellow-500" aria-label="Bewertung: 5 von 5 Sternen">`
- Selector: `div.flex > div.transition-[transform,opacity] > div.relative > div.flex`
  Snippet: `<div class="flex gap-1 mb-8 text-yellow-500" aria-label="Bewertung: 5 von 5 Sternen">`

**Recommendation for Fix**:
Either add `role="group"` or `role="img"` to the `<div>` elements containing the `aria-label`, or convert the `<div>` into an element that semantically accepts an `aria-label` natively without an explicit role.

## Conclusion

The application is highly accessible with an excellent score of 97. The only issue is a minor semantic violation with `aria-label` on non-interactive/non-role `<div>` elements used for star ratings. Fixing this will likely push the score to 100.
