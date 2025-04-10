import {apply} from "../../../utils/function/apply";

export function $map<T, U>(x: Set<T>, callbackfn: (value: T, set: Set<T>) => U, thisArg?: any): Set<U> {
    const result = new Set<U>();

    for (const value of x) {
        result.add(apply(thisArg, callbackfn, [value, x]));
    }

    return result;
}