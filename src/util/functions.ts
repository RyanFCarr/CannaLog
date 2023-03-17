import { format, parseISO } from "date-fns";

export function trimToUndefined(value?: string): string | undefined {
  if (!value) return undefined;

  let trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
}

export function toShortDate(value?: Date | string): string | undefined {
  if (!value) return undefined;
  if (typeof value === "string") {
    // Fancy RegEx to match something like '2022-07-13' or '2022-07-13T00:00:00.0000' or either with a / or \ instead of -
    var matches = value.match(
      /([12]\d{3}[-\/\\](?:0[1-9]|1[0-2])[-\/\\](?:0[1-9]|[12]\d|3[01]))T*(?:(?:\d\d:){2}\d\d(?:\.\d+)*)*/
    );
    if (matches) return matches["1"]; // The above RegEx has a capture group for the first part, yyyy-mm-dd, so we can just grab it here
  }
  if (value instanceof Date) {
    return format(value, "yyyy-MM-dd");
  }
  return value;
}
