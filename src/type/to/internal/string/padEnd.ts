import {$converter} from "./converter";

export function $padEnd(x: string, length: number, fill: string = " "): string {
    return $converter(x).padEnd(length, fill);
}