import {apply} from "../../../utils/function/apply";

export function $reduce<T>(x: Set<T>, callbackfn: (previousValue: T, currentValue: T, set: Set<T>) => T): T;
export function $reduce<T, U>(x: Set<T>, callbackfn: (previousValue: U, currentValue: T, set: Set<T>) => U, initialValue?: U): U;
export function $reduce<T>(x: Set<T>, callbackfn: (previousValue: any, currentValue: T, set: Set<T>) => any, initialValue?: any): any {
    let accumulator;
    let values = Array.from(x);

    if (initialValue !== undefined) {
        accumulator = initialValue;
    } else {
        accumulator = values.splice(0, 1)[0];
    }

    for (const value of values) {
        accumulator = apply(undefined, callbackfn, [accumulator, value, x]);
    }

    return accumulator;
}