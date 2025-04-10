import {$converter} from "./converter";

export function $at<T>(x: ArrayLike<T>, n?: number): T | undefined {
    const arr = $converter(x);

    if (n === undefined) {
        return undefined;
    }

    if (n < 0) {
        return arr[n + arr.length];
    } else {
        return arr[n];
    }
}