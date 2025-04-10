import {$converter} from "./converter";

export function $rands<T>(x: ArrayLike<T>, n: number): T[] {
    const arr = $converter(x);
    const size = Math.min(arr.length, n);
    const result = new Array(size);
    const selected = new Set();

    for (let i = arr.length - size, j = 0; i < arr.length; i++, j++) {
        let index = Math.floor(Math.random() * (i + 1));

        if (selected.has(index)) {
            index = i;
        }

        selected.add(index);
        result[j] = arr[index];
    }

    return result;
}