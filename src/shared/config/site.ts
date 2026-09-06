/**
 * Canonical site origin.
 *
 * Lives in a dependency-free module so client components (PreferredSourceCta,
 * share buttons, ...) can read it without pulling src/lib/schema.ts and the
 * data modules it imports (reviews, packages, serviceTree, academy) into
 * their client chunk. src/lib/schema.ts re-exports it for existing importers.
 */
export const BASE_URL = 'https://www.codayweb.de';
