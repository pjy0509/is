import {$converter} from "./converter";
import {$filter} from "../../../utils/function/filter";
import {$some} from "../../../utils/function/some";

export function $intersection<T>(lhs: ArrayLike<T>, rhs: ArrayLike<T>, predicate: (lhs: T, rhs: T) => boolean = (lhs, rhs) => lhs === rhs): T[] {
    const l = $converter(lhs);
    const r = $converter(rhs);

    return $filter(l, e=> $some(r, f => predicate(e, f)));
}