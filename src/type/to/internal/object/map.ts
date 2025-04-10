import {apply} from "../../../utils/function/apply";

export function $map<T, U extends object>(x: U, callbackfn: (value: U[keyof U], key: keyof U, obj: U) => T, thisArg?: any): Record<keyof U, T> {
    const result = {} as { [K in keyof U]: T };

    for (const [key, value] of Object.entries(x) as [keyof U, U[keyof U]][]) {
        result[key] = apply(thisArg, callbackfn, [value, key, x]);
    }

    return result;
}