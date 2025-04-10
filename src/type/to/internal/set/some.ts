import {apply} from "../../../utils/function/apply";

export function $some<T>(x: Set<T>, predicate: (value: T, set: Set<T>) => boolean, thisArg?: any): boolean {
    for (const value of x) {
        if (apply(thisArg, predicate, [value, x])) {
            return true;
        }
    }

    return false;
}