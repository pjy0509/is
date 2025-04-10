export function $mixedCase(x: string): boolean {
    return /^(?=.*[a-z])(?=.*[A-Z]).+$/.test(x);
}