export function $buffer(x: unknown): x is ArrayBuffer {
    return x instanceof ArrayBuffer;
}