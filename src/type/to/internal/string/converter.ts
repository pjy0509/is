import {$predicate} from "../../../is/internal/symbol/predicate";
import {$like} from "../../../is/internal/array/like";
import {$converter as $array_converter} from "../array/converter";
import {$iterable} from "../../../is/internal/is/iterable";
import {$map} from "../../../utils/function/map";

export function $converter(): string;
export function $converter(x: unknown): string;
export function $converter<T extends any[]>(...x: T): string;
export function $converter(): string {
    const length = arguments.length;

    if (length === 0) {
        return "";
    }

    if (length === 1) {
        const argument = arguments[0];

        if (typeof argument === "string") {
            return argument;
        }

        if (argument instanceof String) {
            return argument + "";
        }

        if ($predicate(argument)) {
            return Symbol.prototype.toString.call(argument);
        }

        if ($like(argument) || $iterable(argument)) {
            return $map($array_converter(argument), element => $converter(element)) + "";
        }

        if (typeof argument === "object") {
            return JSON.stringify(argument);
        }

        if (1 / argument === -Infinity) {
            return "-0";
        }

        return argument + "";
    }

    return $map($array_converter(arguments), element => $converter(element)) + "";
}