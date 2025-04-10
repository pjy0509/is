import {$converter} from "./converter";
import {$predicate} from "../../../is/internal/number/predicate";
import {$slice} from "../../../utils/function/slice";

export function $takeLast<T>(x: ArrayLike<T>, until: ((value: T, index: number, arr: readonly T[]) => boolean) | number): T[] {
    const arr = $converter(x);

    if ($predicate(until)) {
        if (until <= 0) {
            return [];
        }

        return $slice(arr, -until);
    }

    for (let i = arr.length - 1; i >= 0; i--) {
        if (!until(arr[i], i, arr)) {
            return $slice(arr, i + 1);
        }
    }

    return arr;
}