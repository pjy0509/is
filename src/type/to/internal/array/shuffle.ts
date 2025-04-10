import {$converter} from "./converter";
import {$swap} from "../../../utils/function/swap";

export function $shuffle<T>(x: ArrayLike<T>): T[] {
    const result = $converter(x);
    let i = result.length;
    let j;

    while (i) {
        j = Math.random() * i-- | 0;
        $swap(result, i, j);
    }

    return result;
}