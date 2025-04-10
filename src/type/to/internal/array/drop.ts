import is from "../../../is";
import {$converter} from "./converter";
import {$slice} from "../../../utils/function/slice";
import {$findIndex} from "../../../utils/function/findIndex";
import {$negate} from "../function/negate";

export function $drop<T>(x: ArrayLike<T>, until: ((value: T, index: number, arr: readonly T[]) => boolean) | number): T[] {
    const arr = $converter(x);

    if (is.number(until)) {
        return $slice(arr, Math.max(until, 0));
    }

    const index = $findIndex(arr, $negate(until));

    if (index === -1) {
        return [];
    }

    return $slice(arr, index);
}