import {$converter as $array_converter} from "../array/converter";

export function $converter(): Set<void>;
export function $converter<T>(x: ArrayLike<T>): Set<T>;
export function $converter<T>(x: Iterable<T>): Set<T>;
export function $converter<T>(x: T): Set<T>;
export function $converter<T extends any[]>(...x: T): Set<T[number]>;
export function $converter(): any {
    return new Set($array_converter(...arguments));
}