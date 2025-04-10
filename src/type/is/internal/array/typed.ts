export function $typed(x: unknown): x is Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array | BigUint64Array | Int8Array | Int16Array | Int32Array | BigInt64Array | Float32Array | Float64Array {
    return ArrayBuffer.isView(x) && !(x instanceof DataView);
}