import {$converter} from "./converter";
import {$filter} from "../../../utils/function/filter";
import {$every} from "../../../utils/function/every";

export function $different<T>(lhs: ArrayLike<T>, rhs: ArrayLike<T>, predicate: (lhs: T, rhs: T) => boolean = (lhs, rhs) => lhs === rhs): T[] {
    const l = $converter(lhs);
    const r = $converter(rhs);

    return $filter(l, e => $every(r, f => !predicate(e, f)))
}