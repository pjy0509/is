export function $index(x: number): boolean {
    return Number.isSafeInteger(x) && x >= 0;
}