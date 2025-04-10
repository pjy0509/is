import {$converter} from "./converter";

export function $ats<T>(x: ArrayLike<T>, ...n: number[]): (T | undefined)[] {
    const arr = $converter(x);

    const length = arr.length;
    const result = new Array<T | undefined>(n.length);

    for (let i = 0; i < n.length; i++) {
        let index = n[i];

        if (index < 0) {
            index += length;
        }

        result[i] = arr[index];
    }

    return result;
}