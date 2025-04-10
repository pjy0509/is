import {apply} from "../../../utils/function/apply";

export function $filter<T extends object>(x: T, predicate: (value: T[keyof T], key: keyof T, obj: T) => boolean, thisArg?: any): Partial<T> {
    const result: Partial<T> = {};

    for (const [key, value] of Object.entries(x) as [keyof T, T[keyof T]][]) {
        if (apply(thisArg, predicate, [value, key, x])) {
            result[key] = value;
        }
    }

    return result;
}