export function $swap<T>(x: T[], i: number, j: number): void {
    [x[i], x[j]] = [x[j], x[i]];
}