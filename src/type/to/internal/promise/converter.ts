import {$iterable} from "../../../is/internal/is/iterable";
import {$like} from "../../../is/internal/array/like";

export function $converter(): Promise<void>;
export function $converter<T>(x: Promise<T>): Promise<T>;
export function $converter<T>(x: ArrayLike<T>): Promise<Awaited<T>[]>;
export function $converter<T>(x: Iterable<T>): Promise<Awaited<T>[]>;
export function $converter<T>(x: T): Promise<Awaited<T>>;
export function $converter<T extends any[]>(...x: T): Promise<Awaited<T[number]>[]>;
export function $converter(): any {
    const length = arguments.length;

    if (length === 0) {
        return Promise.resolve();
    }

    if (length === 1) {
        const argument = arguments[0];

        if (argument instanceof Promise) {
            return argument;
        }

        if (Array.isArray(argument)) {
            return Promise.all(argument);
        }

        if ($like(argument)) {
            return Promise.all(Array.from(argument));
        }

        if ($iterable(argument)) {
            return Promise.all([...argument]);
        }

        return Promise.resolve(argument);
    }

    return Promise.resolve([...arguments]);
}