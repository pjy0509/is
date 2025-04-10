export function $numeric(x: string): boolean {
    return /^[0-9]+$/.test(x);
}