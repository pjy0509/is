import {$converter} from "./converter";
import {$predicate} from "../../../is/internal/number/predicate";
import {$slice} from "../../../utils/function/slice";

export function $take<T>(x: ArrayLike<T>, until: ((value: T, index: number, arr: readonly T[]) => boolean) | number): T[] {
    const arr = $converter(x);

    if ($predicate(until)) {
        return $slice(arr, 0, Math.max(until, 0));
    }

    for (let i = 0; i <= arr.length; i++) {
        if (!until(arr[i], i, arr)) {
            return $slice(arr, 0, i);
        }
    }

    return arr;
}