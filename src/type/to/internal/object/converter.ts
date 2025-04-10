import {$fromEntries} from "./fromEntries";
import {$iterable} from "../../../is/internal/is/iterable";
import {$like} from "../../../is/internal/array/like";
import {$entries} from "../../../is/internal/array/entries";

export function $converter(): {};
export function $converter<T, U>(x: [T, U][]): { [K in keyof any]: U };
export function $converter<T>(x: ArrayLike<T>): { length: number, [K: number]: T };
export function $converter<T>(x: Iterable<T>): { length: number, [K: number]: T };
export function $converter<T>(x: T): Object;
export function $converter<T extends any[]>(...x: T): { length: number, [K: number]: T };
export function $converter(): any {
    const length = arguments.length;

    if (length === 0) {
        return {};
    }

    if (length === 1) {
        const argument = arguments[0];

        if ($like(argument)) {
            if ($entries(argument)) {
                return $fromEntries(argument);
            }

            const result: any = {length: argument.length};

            for (const key of Object.keys(argument)) {
                result[key] = (argument as any)[key];
            }

            return result;
        }

        if ($iterable(argument)) {
            return $converter([...argument]);
        }

        if (typeof argument === "object") {
            return argument;
        }

        if (typeof argument === "string" || argument as any instanceof String) {
            try {
                return JSON.parse(argument as string);
            } catch {
            }
        }

        return Object(argument);
    }

    return $converter([...arguments]);
}