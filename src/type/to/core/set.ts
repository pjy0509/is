import {$converter} from "../internal/set/converter";
import {$forEach} from "../internal/set/forEach";
import {$map} from "../internal/set/map";
import {$filter} from "../internal/set/filter";
import {$reduce} from "../internal/set/reduce";
import {$every} from "../internal/set/every";
import {$some} from "../internal/set/some";
import {$find} from "../internal/set/find";

export interface SetConverter {
    (): Set<void>;

    <T>(x: ArrayLike<T>): Set<T>;

    <T>(x: Iterable<T>): Set<T>;

    <T>(x: T): Set<T>;

    <T extends any[]>(...x: T): Set<T[number]>;

    forEach<T>(x: Set<T>, callbackfn: (value: T, set: Set<T>) => void, thisArg?: any): void;

    map<T, U>(x: Set<T>, callbackfn: (value: T, set: Set<T>) => U, thisArg?: any): Set<U>;

    filter<T>(x: Set<T>, predicate: (value: T, set: Set<T>) => boolean, thisArg?: any): Set<T>;

    reduce<T>(x: Set<T>, callbackfn: (previousValue: T, currentValue: T, set: Set<T>) => T): T;

    reduce<T, U>(x: Set<T>, callbackfn: (previousValue: U, currentValue: T, set: Set<T>) => U, initialValue: U): U;

    every<T>(x: Set<T>, predicate: (value: T, set: Set<T>) => boolean, thisArg?: any): boolean;

    some<T>(x: Set<T>, predicate: (value: T, set: Set<T>) => boolean, thisArg?: any): boolean;

    find<T>(x: Set<T>, predicate: (value: T, set: Set<T>) => boolean, thisArg?: any): T | undefined;

    [Symbol.toStringTag]: string;
}

export const $set: SetConverter = Object.assign(
    $converter,
    {
        forEach: $forEach,
        map: $map,
        filter: $filter,
        reduce: $reduce,
        every: $every,
        some: $some,
        find: $find,

        [Symbol.toStringTag]: "To.Set"
    }
)