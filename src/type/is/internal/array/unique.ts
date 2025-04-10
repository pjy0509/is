import {$converter} from "../../../to/internal/array/converter";

export function $unique<T>(x: ArrayLike<T>): boolean {
    return x.length === new Set($converter(x)).size;
}