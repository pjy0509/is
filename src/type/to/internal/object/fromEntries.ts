import {$converter} from "../array/converter";

export function $fromEntries<T, U>(x: [T, U][]): { [K in keyof any]: U } {
    const result: any = Object(null);

    for (const [key, value] of $converter(x)) {
        result[key] = value;
    }

    return result;
}