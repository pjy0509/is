import {DeepOmit, Keys} from "../../utils/types";
import {$converter} from "../internal/object/converter";
import {$fromEntries} from "../internal/object/fromEntries";
import {$forEach} from "../internal/object/forEach";
import {$map} from "../internal/object/map";
import {$filter} from "../internal/object/filter";
import {$reduce} from "../internal/object/reduce";
import {$every} from "../internal/object/every";
import {$some} from "../internal/object/some";
import {$find} from "../internal/object/find";
import {$findKey} from "../internal/object/findKey";
import {$invert} from "../internal/object/invert";
import {$keys} from "../internal/object/keys";
import {$values} from "../internal/object/values";
import {$entries} from "../internal/object/entries";
import {$omit} from "../internal/object/omit";

export type ObjectConverter = {
    (): {};
    <T, U>(x: [T, U][]): { [K in keyof any]: U };
    <T>(x: ArrayLike<T>): { length: number, [K: number]: T };
    <T>(x: Iterable<T>): { length: number, [K: number]: T };
    <T>(x: T): Object;
    <T extends any[]>(...x: T): { length: number, [K: number]: T };

    fromEntries<T, U>(x: [T, U][]): { [K in keyof any]: U };

    forEach<T extends object>(x: T, callbackfn: (value: T[keyof T], key: keyof T, obj: T) => void, thisArg?: any): void;

    map<T extends object, U>(x: T, callbackfn: (value: T[keyof T], key: keyof T, obj: T) => U, thisArg?: any): Record<keyof T, U>;

    filter<T extends object>(x: T, predicate: (value: T[keyof T], key: keyof T, obj: T) => boolean, thisArg?: any): Partial<T>;

    reduce<T extends object>(x: T, callbackfn: (previousValue: T[keyof T], currentValue: T[keyof T], currentKey: keyof T, obj: T) => T[keyof T]): T[keyof T];

    reduce<T extends object, U>(x: T, callbackfn: (previousValue: U, currentValue: T[keyof T], currentKey: keyof T, obj: T) => U, initialValue: U): U;

    every<T extends object>(x: T, predicate: (value: T[keyof T], key: keyof T, obj: T) => boolean, thisArg?: any): boolean;

    some<T extends object>(x: T, predicate: (value: T[keyof T], key: keyof T, obj: T) => boolean, thisArg?: any): boolean;

    find<T extends object>(x: T, predicate: (value: T[keyof T], key: keyof T, obj: T) => boolean, thisArg?: any): T[keyof T] | undefined;

    findKey<T extends object>(x: T, predicate: (value: T[keyof T], key: keyof T, obj: T) => boolean, thisArg?: any): keyof T | undefined;

    invert<T extends PropertyKey>(x: ArrayLike<T>): Record<T, string>;

    invert<K extends PropertyKey, V extends PropertyKey>(x: Record<K, V>): Record<V, K>;

    keys<T extends object>(x: T): (keyof T)[];

    values<T extends object>(x: T): T[keyof T][];

    entries<T extends object>(x: T): [keyof T, T[keyof T]][];

    omit<T extends object, K extends Keys<T>>(x: T, ...key: K[]): DeepOmit<T, K>;

    omit<T extends object>(x: T, ...key: PropertyKey[]): object;

    [Symbol.toStringTag]: string;
}

export const $object: ObjectConverter = Object.assign(
    $converter,
    {
        fromEntries: $fromEntries,
        forEach: $forEach,
        map: $map,
        filter: $filter,
        reduce: $reduce,
        every: $every,
        some: $some,
        find: $find,
        findKey: $findKey,
        invert: $invert,
        keys: $keys,
        values: $values,
        entries: $entries,
        omit: $omit,

        [Symbol.toStringTag]: "To.Object"
    }
)