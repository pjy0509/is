export function $marker(x: string): boolean {
    return /^\p{M}+$/u.test(x);
}