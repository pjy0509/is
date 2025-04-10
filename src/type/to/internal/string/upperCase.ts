import {$converter} from "./converter";

export function $upperCase<T extends string>(x: string): Uppercase<T> {
    return $converter(x).toUpperCase() as Uppercase<T>;
}