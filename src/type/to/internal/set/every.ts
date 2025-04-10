import {apply} from "../../../utils/function/apply";

export function $every<T>(x: Set<T>, predicate: (value: T, set: Set<T>) => boolean, thisArg?: any): boolean {
    for (const value of x) {
        if (!apply(thisArg, predicate, [value, x])) {
            return false;
        }
    }

    return true;
}