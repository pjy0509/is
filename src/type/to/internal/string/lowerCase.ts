import {$converter} from "./converter";

export function $lowerCase<T extends string>(x: string): Lowercase<T> {
    return $converter(x).toLowerCase() as Lowercase<T>;
}