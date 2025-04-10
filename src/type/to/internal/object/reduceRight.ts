import {apply} from "../../../utils/function/apply";

export function $reduceRight<T extends object>(x: T, callbackfn: (previousValue: T[keyof T], currentValue: T[keyof T], currentKey: keyof T, obj: T) => T[keyof T]): T[keyof T];
export function $reduceRight<T extends object, U>(x: T, callbackfn: (previousValue: U, currentValue: T[keyof T], currentKey: keyof T, obj: T) => U, initialValue?: U): U;
export function $reduceRight<T extends object>(x: T, callbackfn: (previousValue: any, currentValue: T[keyof T], currentKey: keyof T, obj: T) => any, initialValue?: any): any {
    let accumulator;
    let entries = Object.entries(x);
    let lastIndex = entries.length - 1;

    if (initialValue !== undefined) {
        accumulator = initialValue;
    } else {
        accumulator = entries.splice(lastIndex--, 1)[0][1];
    }

    for (let i = lastIndex; i >= 0; i--) {
        const entry = entries[i];

        accumulator = apply(undefined, callbackfn, [accumulator, entry[1], entry[0], x]);
    }

    return accumulator;
}