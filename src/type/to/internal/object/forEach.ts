import {apply} from "../../../utils/function/apply";

export function $forEach<T extends object>(x: T, callbackfn: (value: T[keyof T], key: keyof T, obj: T) => void, thisArg?: any): void {
    for (const [key, value] of Object.entries(x) as [keyof T, T[keyof T]][]) {
        apply(thisArg, callbackfn, [value, key, x]);
    }
}