export function $alphanumeric(x: string): boolean {
    return /^[a-zA-Z0-9]+$/.test(x);
}