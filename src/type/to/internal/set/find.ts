import {apply} from "../../../utils/function/apply";

export function $find<T>(x: Set<T>, predicate: (value: T, set: Set<T>) => boolean, thisArg?: any): T | undefined {
    for (const value of x) {
        if (apply(thisArg, predicate, [value, x])) {
            return value;
        }
    }

    return undefined;
}