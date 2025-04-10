export function $blob(x: unknown): x is Blob {
    try {
        return x instanceof Blob;
    } catch {
        return false;
    }
}