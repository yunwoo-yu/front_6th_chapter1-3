export const shallowEquals = (a: unknown, b: unknown) => {
  if (a === b) {
    return true;
  }

  if (typeof a !== "object" || a === null || typeof b !== "object" || b === null) {
    return false;
  }

  const keysA = Object.keys(a) as (keyof typeof a)[];
  const keysB = Object.keys(b) as (keyof typeof b)[];

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (!Object.hasOwn(b, key) || a[key] !== b[key]) {
      return false;
    }
  }
  return true;
};
