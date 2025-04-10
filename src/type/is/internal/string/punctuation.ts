export function $punctuation(x: string): boolean {
    return /^\p{P}+$/u.test(x);
}