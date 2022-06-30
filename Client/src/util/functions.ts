import { format, parseISO } from "date-fns";

export function trimToUndefined(value: string | undefined) {
    if (!value) return undefined;

    let trimmed = value.trim();
    return trimmed === "" ? undefined : trimmed;
}

export function toShortDate(value: Date | string | undefined) {
    if (!value) return undefined;

    if (typeof value === 'string') {
        // Must be a date

        return format(parseISO(value), 'yyyy-MM-dd')
    }

    return format(value, 'yyyy-MM-dd')
}