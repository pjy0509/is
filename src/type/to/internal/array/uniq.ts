import {$converter} from "./converter";
import {$negate} from "../function/negate";
import {$every} from "../../../utils/function/every";

export function $uniq<T>(x: ArrayLike<T>, predicate?: (lhs: T, rhs: T) => boolean): T[] {
    const arr = $converter(x);

    if (predicate === undefined) {
        return [...new Set(arr)];
    }

    const result: T[] = [];

    predicate = $negate(predicate);

    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];

        if ($every(result, e => predicate!(e, item))) {
            result.push(item);
        }
    }

    return result;
}