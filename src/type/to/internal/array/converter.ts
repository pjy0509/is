import {$like} from "../../../is/internal/array/like";
import {$iterable} from "../../../is/internal/is/iterable";

export function $converter(): [];
export function $converter<T>(x: ArrayLike<T>): T[];
export function $converter<T>(x: Iterable<T>): T[];
export function $converter<T>(x: T): T[];
export function $converter<T extends any[]>(...x: T): T[number][];
export function $converter(): any {
    const length = arguments.length;

    if (length === 0) {
        return [];
    }

    if (length === 1) {
        const argument = arguments[0];

        if (typeof argument === "string" || argument instanceof String) {
            return argument.split("");
        }

        if (Array.isArray(argument)) {
            return argument;
        }

        if ($like(argument)) {
            return Array.from(argument);
        }

        if ($iterable(argument)) {
            return [...argument];
        }

        return [argument];
    }

    return [...arguments];
}