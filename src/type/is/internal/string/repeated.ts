export function $repeated(x: string, n: number): boolean {
    return n <= 1 ? true : new RegExp("(.)\\1{" + (n - 1) + ",}").test(x);
}