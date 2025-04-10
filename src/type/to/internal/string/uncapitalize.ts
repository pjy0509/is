import {$converter} from "./converter";

export function $uncapitalize<T extends string>(x: string): Uncapitalize<T> {
    x = $converter(x);

    return x.charAt(0).toLowerCase() + x.slice(1).toUpperCase() as Uncapitalize<T>;
}