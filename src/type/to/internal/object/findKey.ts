import {apply} from "../../../utils/function/apply";

export function $findKey<T extends object>(x: T, predicate: (value: T[keyof T], key: keyof T, obj: T) => boolean, thisArg?: any): keyof T | undefined {
    for (const [key, value] of Object.entries(x) as [keyof T, T[keyof T]][]) {
        if (apply(thisArg, predicate, [value, key, x])) {
            return key;
        }
    }

    return undefined;
}