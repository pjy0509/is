import {$predicate} from "../../../is/internal/function/predicate";

export function $converter(): () => void;
export function $converter<T extends (...args: any[]) => any>(x: T): T;
export function $converter<T>(x: T): () => T;
export function $converter<T extends any[]>(...x: T): () => T[number][];
export function $converter(): any {
    const length = arguments.length;

    if (length === 0) {
        return function () {
        }
    }

    if (length === 1) {
        const argument = arguments[0];

        if ($predicate(argument)) {
            return argument;
        }

        return function () {
            return argument;
        }
    }

    return function () {
        return [...arguments];
    }
}