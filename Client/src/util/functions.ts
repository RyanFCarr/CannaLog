import { format, parseISO } from "date-fns";

export function trimToUndefined(value: string | undefined) {
    if (!value) return undefined;

    let trimmed = value.trim();
    return trimmed === "" ? undefined : trimmed;
}

export function toShortDate(value: string | undefined) {
    if (!value) return undefined;

    return format(parseISO(value), 'yyyy-MM-dd')
}