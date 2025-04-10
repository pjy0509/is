import {$converter} from "./converter";
import {$filter} from "../../../utils/function/filter";
import {$some} from "../../../utils/function/some";

export function $union<T, U>(lhs: ArrayLike<T>, rhs: ArrayLike<U>, predicate: (lhs: T, rhs: U) => boolean = (lhs, rhs) => lhs as any === rhs): (T | U)[] {
    const l = $converter(lhs);
    const r = $converter(rhs);

    return (l as (T | U)[]).concat($filter(r, e => !$some(l, f => predicate(f, e))));
}