export function $lowerCase(x: string): boolean {
    return /^[^A-Z]*$/.test(x);
}