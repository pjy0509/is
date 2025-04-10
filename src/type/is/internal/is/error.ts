export function $error(x: unknown): x is Error {
    try {
        return x instanceof Error || x instanceof DOMException;
    } catch {
        return false;
    }
}