import {apply} from "../../../utils/function/apply";

export function $reduce<T extends object>(x: T, callbackfn: (previousValue: T[keyof T], currentValue: T[keyof T], currentKey: keyof T, obj: T) => T[keyof T]): T[keyof T];
export function $reduce<T extends object, U>(x: T, callbackfn: (previousValue: U, currentValue: T[keyof T], currentKey: keyof T, obj: T) => U, initialValue?: U): U;
export function $reduce<T extends object>(x: T, callbackfn: (previousValue: any, currentValue: T[keyof T], currentKey: keyof T, obj: T) => any, initialValue?: any): any {
    let accumulator;
    let entries = Object.entries(x);

    if (initialValue !== undefined) {
        accumulator = initialValue;
    } else {
        accumulator = entries.splice(0, 1)[0][1];
    }

    for (const [key, value] of entries as [keyof T, T[keyof T]][]) {
        accumulator = apply(undefined, callbackfn, [accumulator, value, key, x]);
    }

    return accumulator;
}