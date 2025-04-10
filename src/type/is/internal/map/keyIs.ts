import {Constructor} from "../../../utils/types";
import {$is} from "../array/is";

export function $keyIs<T, U>(x: Map<unknown, U>, keyType: Constructor<T>): x is Map<T, U> {
    return $is(Array.from(x.keys()), keyType);
}