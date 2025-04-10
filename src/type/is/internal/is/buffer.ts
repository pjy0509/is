export function $buffer(x: unknown): x is Buffer {
    try {
        return x instanceof Buffer;
    } catch {
        return false;
    }
}