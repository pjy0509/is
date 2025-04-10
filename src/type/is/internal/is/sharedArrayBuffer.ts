export function $sharedArrayBuffer(x: unknown): x is SharedArrayBuffer {
    try {
        return x instanceof SharedArrayBuffer;
    } catch {
        return false;
    }
}