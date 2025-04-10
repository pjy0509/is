export function dayNumberToShortString(x: number): string {
    return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][x] ?? "";
}