/**
 * Concatenates truthy classes into a space-separated string.
 *
 * @param classes - The classes to concatenate.
 * @returns The concatenated classes.
 */
export const clx = (...classes: (string | boolean | undefined)[]): string => {
  return classes.filter((c) => c).join(" ");
};
