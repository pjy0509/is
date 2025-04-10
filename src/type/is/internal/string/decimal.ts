export function $decimal(x: string): boolean {
    return /^\s*?([+-]?\d*\.?\d*)(e[+-]?\d*\.?\d*)?\s*?$/.test(x);
}