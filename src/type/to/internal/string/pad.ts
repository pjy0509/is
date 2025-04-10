import {$converter} from "./converter";

export function $pad(x: string, length: number, fill: string = " "): string {
    x = $converter(x);

    return x.padStart(Math.floor((length - x.length) / 2) + x.length, fill).padEnd(length, fill);
}