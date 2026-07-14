export function pick<T extends object, K extends keyof T>(
  object: T | null | undefined,
  keys: K[]
): Pick<T, K> {
  const result: Partial<T> = {};

  if (object == null) {
    return result as Pick<T, K>;
  }

  for (const key of keys) {
    if (key in object) {
      result[key] = object[key];
    }
  }

  return result as Pick<T, K>;
}
