export function trimToUndefined(value: string) {
    let trimmed = value.trim();
    return trimmed === "" ? undefined : trimmed;
}