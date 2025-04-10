import {apply} from "../../../utils/function/apply";

export function $forEach<T>(x: Set<T>, callbackfn: (value: T, set: Set<T>) => void, thisArg?: any): void {
    for (const value of x) {
        apply(thisArg, callbackfn, [value, x]);
    }
}