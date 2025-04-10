import {Constructor} from "../../../utils/types";
import {$is} from "../array/is";

export function $valueIs<T, U>(x: Map<U, unknown>, valueType: Constructor<T>): x is Map<U, T> {
    return $is(Array.from(x.values()), valueType);
}