export function $symbol(x: string): boolean {
    return /^\p{S}+$/u.test(x);
}