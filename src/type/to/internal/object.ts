import {DeepOmit, Keys, ObjectObserverHandler, Observable} from "../../utils/types";
import {cloneDeep, isPrototypeProperty, observeObject, omitDeep} from "../../utils/functions";
import to from "../index";
import is from "../../is/index";

export type ObjectConverter = {
    (x: unknown): object;

    observable<T extends object>(x: T, handler: ObjectObserverHandler): Observable<T>;

    freeze<T extends object>(x: T): Readonly<T>;

    clone<T>(x: T): T;

    every<T extends object>(x: T, predicate: (value: T[keyof T], key: keyof T, obj: T) => boolean, thisArg?: any): boolean;

    forEach<T extends object>(x: T, callbackfn: (value: T[keyof T], key: keyof T, obj: T) => void, thisArg?: any): void;

    map<T, U extends object>(x: U, callbackfn: (value: U[keyof U], key: keyof U, obj: U) => T, thisArg?: any): Record<keyof U, T>;

    filter<T extends object>(x: T, predicate: (value: T[keyof T], key: keyof T, obj: T) => boolean, thisArg?: any): Partial<T>;

    reduce<T, U extends object>(x: U, callbackfn: (previousValue: T, currentValue: U[keyof U], currentKey: keyof U, obj: U) => T, initialValue: T): T;

    some<T extends object>(x: T, predicate: (value: T[keyof T], key: keyof T, obj: T) => boolean, thisArg?: any): boolean;

    find<T extends object>(x: T, predicate: (value: T[keyof T], key: keyof T, obj: T) => boolean, thisArg?: any): T[keyof T] | undefined;

    findKey<T extends object>(x: T, predicate: (value: T[keyof T], key: keyof T, obj: T) => boolean, thisArg?: any): keyof T | undefined;

    entries<T>(x: ArrayLike<T>): [string, T][];

    entries<T extends object>(x: T): [keyof T, T[keyof T]][];

    keys<T>(x: ArrayLike<T>): string[];

    keys<T extends object>(x: T): (keyof T)[];

    values<T>(x: ArrayLike<T>): T[];

    values<T extends object>(x: T): T[keyof T][];

    omit<T extends object, K extends Keys<T>>(x: T, ...key: K[]): DeepOmit<T, K>;

    omit<T extends object>(x: T, ...key: PropertyKey[]): object;

    invert<T extends PropertyKey>(x: ArrayLike<T>): Record<T, string>;

    invert<K extends PropertyKey, V extends PropertyKey>(x: Record<K, V>): Record<V, K>;

    set(x: any, key: PropertyKey, value: any): void;

    get<T>(x: any, key: PropertyKey): T | undefined;

    has(x: any, key: PropertyKey): boolean;
}

// @ts-ignore
export const $object: ObjectConverter = Object.assign(
    function $object(x: unknown): object {
        return is.object(x) ? x : Object(x);
    },
    {
        observable: function $observable<T extends object>(x: T, handler: ObjectObserverHandler): Observable<T> {
            return observeObject(x, handler);
        },

        freeze: function $freeze<T extends object>(x: T): Readonly<T> {
            return (Object.freeze || Object)(x);
        },

        clone: function $clone<T>(x: T): T {
            return cloneDeep(x);
        },

        every: function $every<T extends object>(x: T, predicate: (value: T[keyof T], key: keyof T, obj: T) => boolean, thisArg?: any): boolean {
            for (const [key, value] of to.object.entries(x)) {
                if (!predicate.call(thisArg, value, key, x)) {
                    return false;
                }
            }

            return true;
        },

        forEach: function $forEach<T extends object>(x: T, callbackfn: (value: T[keyof T], key: keyof T, obj: T) => void, thisArg?: any): void {
            for (const [key, value] of to.object.entries(x)) {
                callbackfn.call(thisArg, value, key, x);
            }
        },

        map: function $map<T, U extends object>(x: U, callbackfn: (value: U[keyof U], key: keyof U, obj: U) => T, thisArg?: any): Record<keyof U, T> {
            const result: { [K in keyof U]: T } = {} as { [K in keyof U]: T };

            for (const [key, value] of to.object.entries(x)) {
                result[key] = callbackfn.call(thisArg, value, key, x);
            }

            return result;
        },

        filter: function $filter<T extends object>(x: T, predicate: (value: T[keyof T], key: keyof T, obj: T) => boolean, thisArg?: any): Partial<T> {
            const result: Partial<T> = {} as Partial<T>;

            for (const [key, value] of to.object.entries(x)) {
                if (predicate.call(thisArg, value, key, x)) {
                    result[key as keyof T] = value;
                }
            }

            return result;
        },

        reduce: function $reduce<T, U extends object>(x: U, callbackfn: (previousValue: T, currentValue: U[keyof U], currentKey: keyof U, obj: U) => T, initialValue: T): T {
            let accumulator: T = initialValue;

            for (const [key, value] of to.object.entries(x)) {
                accumulator = callbackfn(accumulator, value, key, x);
            }

            return accumulator;
        },

        some: function $some<T extends object>(x: T, predicate: (value: T[keyof T], key: keyof T, obj: T) => boolean, thisArg?: any): boolean {
            for (const [key, value] of to.object.entries(x)) {
                if (predicate.call(thisArg, value, key, x)) {
                    return true;
                }
            }

            return false;
        },

        find: function $find<T extends object>(x: T, predicate: (value: T[keyof T], key: keyof T, obj: T) => boolean, thisArg?: any): T[keyof T] | undefined {
            for (const [key, value] of to.object.entries(x)) {
                if (predicate.call(thisArg, value, key, x)) {
                    return value;
                }
            }
            return undefined;
        },

        findKey: function $findKey<T extends object>(x: T, predicate: (value: T[keyof T], key: keyof T, obj: T) => boolean, thisArg?: any): keyof T | undefined {
            for (const [key, value] of to.object.entries(x)) {
                if (predicate.call(thisArg, value, key, x)) {
                    return key;
                }
            }

            return undefined;
        },

        entries: function $entries<T extends object>(x: T): [keyof T, T[keyof T]][] {
            const result: [keyof T, T[keyof T]][] = [];

            for (const key of to.object.keys(x)) {
                result.push([key, to.object.get<T[keyof T]>(x, key)!]);
            }

            return result;
        },

        keys: function $keys<T extends object>(x: T): (keyof T)[] {
            return Object.keys(x) as (keyof T)[];
        },

        values: function $values<T extends object>(x: T): T[keyof T][] {
            const result: T[keyof T][] = [];

            for (const key of to.object.keys(x)) {
                result.push(to.object.get<T[keyof T]>(x, key)!);
            }

            return result;
        },

        omit: function $omit<T extends object>(x: T, ...keys: readonly string[]): object {
            return omitDeep(x, keys.map((path: string) => path.split('.')));
        },

        invert: function $invert<K extends PropertyKey, V extends PropertyKey>(x: Record<K, V>): Record<V, K> {
            const result: Record<V, K> = {} as Record<V, K>;

            for (const entry of to.object.entries(x)) {
                result[entry[1]] = entry[0];
            }

            return result;
        },

        set: function $set(x: any, key: PropertyKey, value: any): void {
            const descriptor: PropertyDescriptor = Object.getOwnPropertyDescriptor(x, key) ?? {};

            try {
                Object.defineProperty(x, key, {
                    configurable: true,
                    enumerable: true,
                    writable: true,
                    ...descriptor,
                    value
                });
            } catch {
            }
        },

        get: function $get<T>(x: any, key: PropertyKey): T | undefined {
            const descriptor: PropertyDescriptor | undefined = Object.getOwnPropertyDescriptor(x, key);

            if (descriptor) {
                return descriptor.value;
            }

            if (typeof key === "string" && isPrototypeProperty(x, key)) {
                return x[key];
            }

            return undefined;
        },

        has: function $has(x: any, key: PropertyKey): boolean {
            return Object.getOwnPropertyDescriptor(x, key) !== undefined || (typeof key === "string" && isPrototypeProperty(x, key));
        }
    }
)