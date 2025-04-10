export function $null(x: unknown): x is null {
    return x === null;
}