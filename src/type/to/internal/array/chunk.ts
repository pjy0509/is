import {$converter} from "./converter";

export function $chunk<T>(x: ArrayLike<T>, size: number): T[][] {
    const arr = $converter(x);
    const length = Math.ceil(x.length / size);
    const result = Array(length);

    for (let i = 0; i < length; i++) {
        const st = i * size;
        const ed = st + size;

        result[i] = arr.slice(st, ed);
    }

    return result;
}