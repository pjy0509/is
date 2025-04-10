import {$converter} from "./converter";

export function $capitalize<T extends string>(x: string): Capitalize<T> {
    x = $converter(x);

    return x.charAt(0).toUpperCase() + x.slice(1).toLowerCase() as Capitalize<T>;
}