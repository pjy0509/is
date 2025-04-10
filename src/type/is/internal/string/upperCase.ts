export function $upperCase(x: string): boolean {
    return /^[^a-z]*$/.test(x);
}