import {$converter} from "./converter";

export function $bytes(x: string): string[] {
    x = $converter(x);

    const bytes = [];

    for (let i = 0; i < x.length; i++) {
        bytes.push(x[i].charCodeAt(0).toString(16));
    }

    return bytes;
}