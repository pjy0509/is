export function $regExp(x: unknown): x is RegExp {
    try {
        return x instanceof RegExp;
    } catch {
        return false;
    }
}