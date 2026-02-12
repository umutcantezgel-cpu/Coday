/**
 * Transforms a path to include the current language prefix.
 * @param path The path to transform
 * @param lng The language code
 */
export const getLocalizedPath = (path: string, lng: string) => {
  if (
    path.startsWith('http') ||
    path.startsWith('mailto:') ||
    path.startsWith('tel:') ||
    path.startsWith('#')
  ) {
    return path;
  }

  // Clean path to ensure no double slashes
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  // If path already starts with language, don't double prefix (basic check)
  // detailed check would need to know all supported languages
  const parts = cleanPath.split('/');
  if (parts[1] === lng) return cleanPath;

  return `/${lng}${cleanPath}`;
};
