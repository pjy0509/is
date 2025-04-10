import {apply} from "../../../utils/function/apply";

export function $filter<T>(x: Set<T>, predicate: (value: T, set: Set<T>) => boolean, thisArg?: any): Set<T> {
    const result = new Set<T>();

    for (const value of x) {
        if (apply(thisArg, predicate, [value, x])) {
            result.add(value);
        }
    }

    return result;
}